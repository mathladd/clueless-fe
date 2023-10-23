# Tiles for gameboard

# A tile can be a room or not a room and just a tile in a hallway

class Tile:
    def __init__(self, tile_name):
        # if tile_name == TILE, then not a room
        self.tile_name = tile_name

        # if tile_name == tile, then players can only hold one object
        # (hallway is blocked)
        self.players = []

        # if tile_name != TILE
        # then it is a room and can hold weapons
        self.weapons = []        


    # function for determining if it is a room or tile

    ## Tile functions

    ## Room functions
    # function for determining if it has a diagonal room