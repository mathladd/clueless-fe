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

# Turn Phase
Broadcast Response: {
    "responseFor": "currentTurn",
    "currentTurn": "Shaheer"
}