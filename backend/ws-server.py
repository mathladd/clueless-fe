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

# Holds all players who connected and are currently not in lobby
waiting_room_connections = {}

async def handler(websocket):
    async for message in websocket:
        response = None
        print("Message Recvd: " + message)
        json_object = json.loads(message)
        send_to_requester = True
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

        elif json_object['request'] == 'startGame':
            response = await start_game(json_object)
            if response['success'] == 'true':
                websockets = lobbies[json_object['lobby_name']].get_websockets()
                await broad_cast(websockets, str(json.dumps(response, indent = 4)))
                # return since we sent messages to all who are in lobby
                send_to_requester = False
            
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
            "responseFor": "joinLobby"
        }

        # TODO: BroadCast to everyone in lobby player has joined
        # 

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

# Check if atleast 4 players are in and ALL players are ready
async def start_game(json_object):
    lobby_name = json_object['lobby_name']
    username = json_object['username']
    current_lobby = lobbies[lobby_name]
    response = None

    # Check if the player list in the lobby is greater than 3
    if len(current_lobby.players) > 3 and current_lobby.host.username == username:
        
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