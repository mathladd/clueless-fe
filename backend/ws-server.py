from Player import Player
from Lobby import Lobby
import asyncio
import json

import threading
threadLock = threading.Lock()

from websockets.server import serve

# Holds all lobbies
# Players will create lobbies and lobby player list will hold those connections
# if they join or create the lobby
lobbies = {}

global_username_list = set()
gobal_lobby_name_list = set()


# Holds all players who connected and are currently not in lobby
waiting_room_connections = {}

async def handler(websocket):
    async for message in websocket:
        response = None
        print("Message Recvd: " + message)
        json_object = json.loads(message)
        send_to_requester = True

        # Lobby API calls
        if json_object['request'] == 'createUser':
            response = await create_user(websocket, json_object)

        elif json_object['request'] == 'createLobby':
            response = await create_lobby(json_object)
            if response["success"] == "true":
                # broad cast to everyone in waiting room
                await broad_cast(get_waiting_room_sockets(), str(json.dumps(response, indent = 4)))
                # do not return since we have to send message to player
                # who created lobby

        elif json_object['request'] == 'joinLobby':
            response = await join_lobby(json_object)
            if response['success'] == 'true':
                websockets = lobbies[json_object['lobby_name']].get_websockets()
                await broad_cast(websockets, str(json.dumps(response, indent = 4)))
                # return since we sent messages to all who are in lobby
                send_to_requester = False
                
        elif json_object['request'] == 'toggleReady':
            response = await toggle_lobby_ready(json_object)
            if response['success'] == 'true':
                websockets = lobbies[json_object['lobby_name']].get_websockets()
                await broad_cast(websockets, str(json.dumps(response, indent = 4)))
                # return since we sent messages to all who are in lobby
                send_to_requester = False


        # Game initialization api calls
        elif json_object['request'] == 'startGame':
            response = await start_game(json_object)
            if response['success'] == 'true':
                websockets = lobbies[json_object['lobby_name']].get_websockets()
                # send distributed cards to players
                await broad_cast(websockets, str(json.dumps(response, indent = 4)))
                # return since we sent messages to all who are in lobby
                send_to_requester = False

                # Build Dice roll order
                lobbies[json_object['lobby_name']].build_dice_roll_order()
                next_roller = lobbies[json_object['lobby_name']].get_next_dice_roller()

                # Kick off dice rolling phase
                response = {
                    "responseFor": "rolledDice",
                    "dicePhase": "startingDiceRoll",
                    "currentTurn": next_roller
                }

                # send broadcast of turn for next dice roller
                await broad_cast(websockets, str(json.dumps(response, indent = 4)))

        # Game sequence api calls
        elif json_object['request'] == 'rolledDice':
            result = await handle_dice_roll(json_object)
            websockets = lobbies[json_object['lobby_name']].get_websockets()
            # if tie, broadcast tied result, then kick off dice roll phase again
            if result["highest_rolled"] == "tie":
                lobbies[json_object['lobby_name']].build_dice_roll_order()
                next_roller = lobbies[json_object['lobby_name']].get_next_dice_roller()

                # Kick off dice rolling phase
                response =  {
                    "responseFor": "rolledDice",
                    "dicePhase": "startingDiceRoll",
                    "currentTurn": next_roller
                }
            
            elif result["dicePhase"] == "rollingDice":
                response = result
            
            # if not tie, return highest rolled and build turn order            
            else:
                response =  {
                    "responseFor": "rolledDice",
                    "dicePhase": "finishedDiceRoll",
                    "highest_roller": result["highest_roller"],
                    "highest_rolled": result["highest_rolled"]
                }

            await broad_cast(websockets, str(json.dumps(response, indent = 4)))

            # Kick off character selectino phase
            if response["dicePhase"] == "finishedDiceRoll":
                response = {
                    "responseFor": "characterSelect",
                    "currentTurn": lobbies[json_object['lobby_name']].get_next_character_selector(),
                    "characters": lobbies[json_object['lobby_name']].character_selection_list
                }
                await broad_cast(websockets, str(json.dumps(response, indent = 4)))  

        elif json_object['request'] == 'characterSelect':
            websockets = lobbies[json_object['lobby_name']].get_websockets()
            result = await handle_character_selection(json_object)
            response = result
            await broad_cast(websockets, str(json.dumps(response, indent = 4))) 
           
            # Setup gameboard, and determine turn order
            if result["characterSelectionPhase"] == "finished":
                response = {
                    "responseFor": "renderBoard",
                    "gameBoard": lobbies[json_object['lobby_name']].GameBoard.setup_board()
                }
                await broad_cast(websockets, str(json.dumps(response, indent = 4))) 
               
                lobbies[json_object['lobby_name']].build_turn_order()

                response = {
                    "responseFor": "currentTurn",
                    "currentTurn": lobbies[json_object['lobby_name']].get_next_player_turn()
                }   

                await broad_cast(websockets, str(json.dumps(response, indent = 4))) 


        ## Debugging API Calls
        elif json_object['request'] == 'getUsers':
             response = get_users()

        elif json_object['request'] == 'getLobbies':
             response = get_lobbies()

        # Not Implemented
        else:
            print("request not implemented")
            response = {
                "success": "false",
                "message": "Not Implemented",
            }

        # response of request
        print('Response: ' + str(json.dumps(response, indent = 4)))
        if send_to_requester:
            await websocket.send(str(json.dumps(response, indent = 4)))

# broadcast to everyone in waiting room connections list
async def broad_cast(websockets, response):
    for socket in websockets:
            await socket.send(response)

def get_waiting_room_sockets():
    websockets = []
    for key, val in waiting_room_connections.items():
        websockets.append(val.websocket)
    return websockets

async def create_user(websocket, json_object):
    # TODO: change to global_username_list validation for unique usernames
    if json_object['username'] not in waiting_room_connections.keys():

        # Create Player Object
        p = Player(websocket, json_object['username'], 'IN_LOBBY')

        # Save it to dictionary of usernames -> player objects
        waiting_room_connections[json_object['username']] = p

        response = {
            "success": "true",
            "lobbies": get_lobbies(),
            "lobby_count": len(lobbies),
            "message": "user_created",
            "responseFor": "createUser"
        }
    else:
        response = {
            "success": "false",
            "message": "User already exists",
            "responseFor": "createUser"
        }
    return response

async def create_lobby(json_object):
    # Check for existing lobby
    if json_object['lobby_name'] not in lobbies.keys():
        # Create Lobby Object
        l = Lobby(waiting_room_connections[json_object['username']], json_object['lobby_name'])

        # transfer user object to lobby domain
        lobbies[json_object['lobby_name']] = l

        # delete user from waiting_room_connections domain
        # Now user exists in lobby domain inside a lobby objects players list
        del waiting_room_connections[json_object['username']]

        response = {
            "success": "true",
            "lobbies": get_lobbies(),
            "lobby_count": len(lobbies),
            "created_lobby": l.name,
            "message": "lobby_update",
            "responseFor": "createLobby"
        }

    else:
        response = {
            "success": "false",
            "message": "lobby with name already exists",
            "responseFor": "createLobby"
        }
    return response

async def join_lobby(json_object):
    lobby_name = json_object['lobby_name']
    username = json_object['username']
    max_lobby_count = 8
    if username not in waiting_room_connections.keys():
        response = {
            "success": "false",
            "message": "User is not in waiting_room_connections list",
            "responseFor": "joinLobby"
        }
    # Check for existing lobby
    elif lobby_name in lobbies.keys() and len(lobbies[lobby_name].players) < max_lobby_count:

        # Add player to lobby
        lobbies[lobby_name].add_player(waiting_room_connections[username])

        # delete user from waiting_room_connections domain
        # Now user exists in lobby domain inside a lobby objects players list
        del waiting_room_connections[username]

        response = {
            "success": "true",
            "message": f"lobby_update",
            "lobby_name": lobby_name,
            "username": username,
            "lobbies": get_lobbies(),
            "responseFor": "joinLobby",
            "lobbyReadyStatus": lobbies[lobby_name].get_ready_tracker()
        }

    else:
        response = {
            "success": "false",
            "message": "lobby full" if len(lobbies['lobby_name'].players) else "lobby does not exist",
            "responseFor": "joinLobby"
        }
    return response

async def toggle_lobby_ready(json_object):
    lobby_name = json_object['lobby_name']
    username = json_object['username']

    # Add player to lobby
    lobbies[lobby_name].toggle_ready(username)

    response = {
        "success": "true",
        "ready_tracker": str(json.dumps(lobbies[lobby_name].get_ready_tracker(), indent = 4)),
        "message": "player_ready_update",
        "responseFor": "toggleReady"
    }

    return response

# Check if atleast 2 players are in and ALL players are ready
async def start_game(json_object):
    lobby_name = json_object['lobby_name']
    username = json_object['username']
    current_lobby = lobbies[lobby_name]
    response = None

    # Check if the player list in the lobby is greater than 1
    if len(current_lobby.players) > 1 and current_lobby.host.username == username:
        ready_tracker = current_lobby.get_ready_tracker()
        # Check if all players ready status is True
        for key, val in ready_tracker.items():
            if val is False:
                response = {
                    "success": "false",
                    "message": "All players are not ready",
                    "responseFor": "startGame"
                }
                return response
        # All players are ready
        gameboard_data = current_lobby.start_game()
        response = {
            "success": "true",
            "message": "start_game",
            "gameboard_data": gameboard_data,
            "responseFor": "startGame"
        }
    else:
        response = {
            "success": "false",
            "message": "not enough players",
            "responseFor": "startGame"
        }  
    return response

async def handle_dice_roll(json_object):
    lobby_name = json_object['lobby_name']
    username = json_object['username']
    dice_roll = json_object['dice_roll']
    current_lobby = lobbies[lobby_name]
    response = None
    next_roller = None
    current_lobby.add_rolled_dice(username, dice_roll)

    # get next dice roller if available
    if len(current_lobby.dice_roll_order) > 0:
        next_roller = current_lobby.get_next_dice_roller()
        response = {
            "responseFor": "rolledDice",
            "dicePhase": "rollingDice",
            "currentTurn": next_roller,
            "highest_rolled": "None"
        }

    # if not available, then dice rolls finished, calculate order
    else:
        response = current_lobby.get_highest_dice_roller()

    return response

async def handle_character_selection(json_object):
    lobby_name = json_object['lobby_name']
    username = json_object['username']
    current_lobby = lobbies[lobby_name]
    chosen_character = json_object['chosenCharacter']
    response = None

    current_lobby.assign_character_to_player(username, chosen_character)
    current_lobby.delete_character_from_selection(chosen_character)

    if len(current_lobby.character_selection_order) > 0:
        response = {
            "responseFor": "characterSelect",
            "currentTurn": current_lobby.get_next_character_selector(),
            "characters": current_lobby.character_selection_list,
            "characterSelectionPhase": "selecting"
        }
    else:
        response = {
            "responseFor": "characterSelect",
            "currentTurn": "",
            "characters": "",
            "characterSelectionPhase": "finished"
        }

    return response

def get_users():
    usernames = []
    for key, value in waiting_room_connections.items() :
        usernames.append(key)
    return usernames

def get_lobbies():
    lobbies_data = {}
    for key, value in lobbies.items() :
        lobby_players = []
        for player in value.players:
            lobby_players.append(player.username)
        lobbies_data[key] = lobby_players
    return lobbies_data

# Use task = asyncio.create_task(ping(websocket))
async def ping(websocket):
    while True:
        await websocket.send('{"message":"PING"}')
        print('------ ping')
        await asyncio.sleep(5)

async def main():
    async with serve(handler, "localhost", 8765, ping_interval=None):
        await asyncio.Future()  # run forever

asyncio.run(main())