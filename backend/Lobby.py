import Player
from GameBoard import GameBoard
import json

class Lobby:
    def __init__(self, host, name):
        # Host is a player object
        self.host = host
        self.name = name
        self.players = [host]
        self.ready_tracker = {}
        # {
        #     "dakota": False,
        #     "shaheer": True
        # }
        self.GameBoard = None
        self.ready_tracker[host.username] = False

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
        return self.ready_tracker
    
    def get_websockets(self):
        websockets = []
        for player in self.players:
            websockets.append(player.websocket)
        return websockets

    def start_game(self):
        gameboard_data = {}

        self.GameBoard = GameBoard()
        gameboard_data["winning_combo"] = self.GameBoard.select_murder_scene()
        gameboard_data["player_cards"] = self.GameBoard.distribute_cards(self.players)
        gameboard_data["left_over_cards"] = self.GameBoard.left_over_cards

        # Return gameboard data
        return gameboard_data