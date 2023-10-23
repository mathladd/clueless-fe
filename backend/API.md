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
        "message": "user_created"
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
        "Anthony"
    ]

# Create Lobby
    Request:
    {
        "request": "createLobby",
        "lobby_name": "These",
        "username": "Dakota"
    }

    Response: 
    {
        "success": "true",
        "lobbies": {
            "These": [
                "Dakota"
            ]
        },
        "lobby_count": 1,
        "created_lobby": "These",
        "message": "lobby_update"
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

    Response:
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
        }
    }

# Toggle Ready
    Request:
    {
        "request": "toggleReady",
        "username": "Dakota",
        "lobby_name": "These"
    }
    Response:
    {
        "success": "true",
        "ready_tracker": "{\n    \"Dakota\": true,\n    \"Shaheer\": false,\n    \"Duy\": false,\n    \"Anthony\": false\n}",
        "message": "player_ready_update"
    }
# Start Game
    Request:
    {
        "request": "startGame",
        "username": "Dakota",
        "lobby_name": "These"
    }
    Response:
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
        }
    }