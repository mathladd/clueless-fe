# Creating User
    Request: 
    {
        "request": "createUser",
        "username": "Dakota"
    }

    Response: 
    {
        "success": "true",
        "lobbies": {},
        "lobby_count": 0,
        "message": "user_created",
        "responseFor": "createUser"
    }

# Get All Users in Waiting Room
    Request:
    {
        "request": "getUsers"
    }

    Response: [
        "Dakota",
        "Shaheer",
        "Duy",
        "Anthony",
    ]

# Create Lobby
    Request:
    {
        "request": "createLobby",
        "lobby_name": "These",
        "username": "Dakota"
    }

    Broadcast Response for waiting room connections: 
    {
        "success": "true",
        "lobbies": {
            "These": [
                "Dakota"
            ]
        },
        "lobby_count": 1,
        "created_lobby": "These",
        "message": "lobby_update",
        "responseFor": "createLobby"
    }

# Get Lobbies
    Request:
    {
        "request": "getLobbies"
    }

    Response:
    {
        "These": [
            "Dakota",
            "Shaheer",
            "Duy",
            "Anthony"
        ]
    }

# Join Lobby
    Request:
    {
        "request": "joinLobby",
        "username": "Anthony",
        "lobby_name": "These"
    }

    Broadcast Response for lobby connections:
    {
        "success": "true",
        "message": "lobby_update",
        "lobby_name": "These",
        "username": "Shaheer",
        "lobbies": {
            "These": [
                "Dakota",
                "Shaheer"
            ]
        },
        "responseFor": "joinLobby"
    }

# Toggle Ready
    Request:
    {
        "request": "toggleReady",
        "username": "Dakota",
        "lobby_name": "These"
    }
    Broadcast Response for lobby connections:
    {
        "success": "true",
        "ready_tracker": "{\n    \"Dakota\": true,\n    \"Shaheer\": false,\n    \"Duy\": false,\n    \"Anthony\": false\n}",
        "message": "player_ready_update",
        "responseFor": "toggleReady"
    }

# Start Game
    Request:
    {
        "request": "startGame",
        "username": "Dakota",
        "lobby_name": "These"
    }
    Broadcast Response for lobby connections:
    {
        "success": "true",
        "message": "start_game",
        "gameboard_data": {
            "winning_combo": [
                "knife",
                "living room",
                "Shaheer"
            ],
            "player_cards": {
                "Dakota": [
                    "balcony"
                ],
                "Shaheer": [
                    "Duy"
                ],
                "Duy": [
                    "kitchen"
                ],
                "Anthony": [
                    "Anthony"
                ]
            },
            "left_over_cards": [
                "Dakota",
                "gun"
            ]
        },
        "responseFor": "startGame"
    }

# Dice Roll
Broadcast response: {
    "responseFor": "rolledDice",
    "dicePhase": "startingDiceRoll",
    "currentTurn": "Dakota"
}

Request: {
    "request": "rolledDice",
    "username": "Dakota",
    "lobby_name": "lobby1",
    "dice_roll": "1"
}

Broadcast response: {
    "responseFor": "rolledDice",
    "dicePhase": "rollingDice",
    "currentTurn": "Shaheer",
    "highest_rolled": "None"
}

# Character Selection
Broadcast Response: {
    "responseFor": "characterSelect",
    "currentTurn": "Shaheer",
    "characters": [
        "Miss Scarlett",
        "Colonel Mustard",
        "Mrs. White",
        "Mr. Green",
        "Mrs. Peacock",
        "Professor Plum"
    ]
}
Request: {
    "request": "characterSelect",
    "username": "Shaheer",
    "lobby_name": "lobby1",
    "chosenCharacter": "Professor Plum"
}

Broadcast Response: {
    "responseFor": "characterSelect",
    "currentTurn": "Dakota",
    "characters": [
        "Miss Scarlett",
        "Colonel Mustard",
        "Mrs. White",
        "Mr. Green",
        "Mrs. Peacock"
    ],
    "characterSelectionPhase": "selecting"
}

Request: 
{
    "request": "characterSelect",
    "username": "Dakota",
    "lobby_name": "lobby1",
    "chosenCharacter": "Mr. Green"
}

# Board Render
Request: 
{
    "request": "renderBoard",
    "lobby_name": "lobby1",
}
Broadcast Response: 
{
    "responseFor": "renderBoard",
    "gameBoard": {
        "0,0": {
            "name": "Study",
            "players": [],
            "weapons": []
        },
        
        ...

        "4,4": {
            "name": "Kitchen",
            "players": [],
            "weapons": []
        }
    }
}

# Turn Phase
Request: 
{
    "request": "currentTurn",
    "lobby_name": "lobby1",
}
Broadcast Response: {
    "responseFor": "currentTurn",
    "currentTurn": "Shaheer"
}

# Player movement

Request: 
{
    "request": "characterMove",
    "username": "Dakota",
    "lobby_name": "lobby1",
    "prev_coords": "x,y",
    "new_coords": "x,y"
}

Broadcast Response: {
    "responseFor": "characterMove",
    "username": "Dakota",
    "status": "success"
}


Broadcast Response: {
    "responseFor": "renderBoard",
    "gameBoard": {
        "0,0": {
            "name": "Study",
            "players": [],
            "weapons": []
        },
        
        ...

        "4,4": {
            "name": "Kitchen",
            "players": [],
            "weapons": []
        }
    }
}

# Player suggest

Request: 
{
    "request": "suggest",
    "username": "Dakota",
    "lobby_name": "lobby1",
    "suggested_character": "Professor Plum",
    "suggested_weapon": "Candlestick",
    "suggested_room": "Kitchen",
    "suggested_username": "Shaheer", // Could be none...
    "suggested_username_coords": "x,y",
    "user_coords:"x,y"
}

Response: 
{
    "responseFor": "suggest",
    "found_card": found_card,
    "found_player": found_player,
    "suggested_username": "Dakota"
}

# Accuse

Request:
{
    "request": "accuse",
    "username": "Dakota",
    "lobby_name": "lobby1",
    "accused_character": "Professor Plum",
    "accused_weapon": "Candlestick",
    "accused_room": "Lounge",
}

{
    "responseFor": "accuse",
    "result": "True" or "False"
}

## If True

{
    "responseFor": "gameOver"
}

# Next Turn
Request:
{
    "request": "nextTurn",
    "username": "Shaheer",
    "lobby_name": "lobby1"
}

Response 
{
    "responseFor": "nextTurn",
    "nextTurn": "Dakota"
}