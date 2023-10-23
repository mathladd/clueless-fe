# Installation
    Install python 3.8 and above
    Documentation
        https://pypi.org/project/websockets/
        https://websockets.readthedocs.io/en/stable/intro/tutorial1.html#
            pip install websockets

# Running server
    py .\ws-server.py
    
# Class Layout

    ws-server.py manages all lobbies

    every lobby manages a game

    every gameboard holds logic for game

        gameboard contains grid for board

            every grid unit is a tile that is a room or tile in hallway
            
                Tiles can hold players if a tile in hallway

                tiles can hold players, weapons, and room names if a room
