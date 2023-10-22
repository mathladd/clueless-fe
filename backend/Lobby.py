import Player
import GameBoard
import json
class Lobby:
    def __init__(self, host, name):
        # Host is a player object
        self.host = host
        self.name = name
        self.players = [host]
        self.ready_tracker = {}

    # Add player object to list of players in lobby
    def add_player(self, player):
        self.players.append(player)
        self.ready_tracker[player.username] = False

    def toggle_ready(self, player_name):
        if self.ready_tracker[player_name] == True:
            self.ready_tracker[player_name] = False
        else:
            self.ready_tracker[player_name] = True
    
    def get_ready_tracker(self):
        return str(json.dumps(self.ready_tracker, indent = 4))
    