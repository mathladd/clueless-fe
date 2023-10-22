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

        # Every request should have a request for specific function

        # add user to waiting_room_connections
        if json_object['request'] == 'createUser':
            response = await create_user(websocket, json_object)

        elif json_object['request'] == 'createLobby':

            response = await create_lobby(json_object)

            for key, val in waiting_room_connections.items():
                 await val.send(response)
            return
                

        elif json_object['request'] == 'joinLobby':
            response = await join_lobby(json_object)

        elif json_object['request'] == 'toggleReady':
            response = await toggle_lobby_ready(json_object)

        ## Debugging API Calls
        elif json_object['request'] == 'getUsers':
             response = await get_users()

        elif json_object['request'] == 'getLobbies':
             response = await get_lobbies()

        # Not Implemented
        else:
            print("request not implemented")
            response = "Not Implemented"
        # response of request
        print('Response: ' + response)
        
        await websocket.send(response)


async def create_user(websocket, json_object):

    if json_object['username'] not in waiting_room_connections.keys():

        # Create Player Object
        p = Player(websocket, json_object['username'], 'IN_LOBBY')

        # Save it to dictionary of usernames -> player objects
        waiting_room_connections[json_object['username']] = p

        response = {
            "success": "true",
            "lobbies": await get_lobbies(),
            "lobby_count": len(lobbies)
        }
    else:
        response = {
            "success": "false",
            "message": "User already exists"
        }
    return str(json.dumps(response, indent = 4) )

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
            "lobbies": await get_lobbies(),
            "lobby_count": len(lobbies),
            "created_lobby": l.name
        }

    else:
        response = {
            "success": "false",
            "message": "lobby with name already exists"
        }
    return str(json.dumps(response, indent = 4))

async def join_lobby(json_object):
    lobby_name = json_object['lobby_name']
    username = json_object['username']
    max_lobby_count = 8
    if username not in waiting_room_connections.keys():
        response = {
            "success": "false",
            "message": "User is not in waiting_room_connections list"
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
            "message": f"player joined lobby {lobby_name}"
        }

        # TODO: BroadCast to everyone in lobby player has joined
        # 

    else:
        response = {
            "success": "false",
            "message": "lobby full" if len(lobbies['lobby_name'].players) else "lobby does not exist"
        }
    return str(json.dumps(response, indent = 4))

async def toggle_lobby_ready(json_object):
    lobby_name = json_object['lobby_name']
    username = json_object['username']

    # Add player to lobby
    lobbies[lobby_name].toggle_ready(username)

    response = {
        "success": "true",
        "message": "toggled ready status",
        "ready_tracker": lobbies[lobby_name].get_ready_tracker
    }

    # TODO: BroadCast to everyone in lobby player has joined
    # 

    return str(json.dumps(response, indent = 4))

# Check if atleast 4 players are in and ALL players are ready
async def start_game(json_object):
    # need lobby name, username
    None

async def get_users():
    usernames = []
    for key, value in waiting_room_connections.items() :
        usernames.append(key)
    return str(json.dumps(usernames, indent = 4))

async def get_lobbies():
    lobbies_data = {}
    for key, value in lobbies.items() :
        lobby_players = []
        for player in value.players:
            lobby_players.append(player.username)
        lobbies_data[key] = lobby_players
    return str(json.dumps(lobbies_data, indent = 4))

async def main():
    async with serve(handler, "localhost", 8765):
        await asyncio.Future()  # run forever

asyncio.run(main())