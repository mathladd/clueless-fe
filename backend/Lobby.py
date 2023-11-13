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
        self.GameBoard = None
        self.ready_tracker[host.username] = False
        # Fill this with player lobby order for dice roll
        self.dice_roll_order = []
        self.dice_tracker = {}
        self.character_selection_list = [
            "Miss Scarlett", "Colonel Mustard", 
            "Mrs. White", "Mr. Green", 
            "Mrs. Peacock", "Professor Plum"
            ]
        
        self.dice_winner = None

        # Based off of gameboard character order
        # and highest roller of dice
        self.turn_order = []
        
        # Based off highest rolled dice
        self.character_selection_order = []

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
    
    def build_dice_roll_order(self):
        # Clear roll order
        self.dice_roll_order = []
        
        # fill roll order
        for player in self.players:
            self.dice_roll_order.append(player.username)
         
    def get_next_dice_roller(self):
        next_roller = self.dice_roll_order[0]
        del self.dice_roll_order[0]
        return next_roller
    
    def add_rolled_dice(self, username, dice_roll):
        self.dice_tracker[username] = dice_roll

    def get_highest_dice_roller(self):
        highest_rolled = -1
        highest_roller = None
        
        for key, val in self.dice_tracker.items():
            if int(val) > int(highest_rolled):
                highest_rolled = val
                highest_roller = key

        highest_rolled_tie_counter = 0
        for key, val in self.dice_tracker.items():
            if int(val) == int(highest_rolled):
                highest_rolled_tie_counter += 1
        
        if highest_rolled_tie_counter > 1:
            # reset dice tracker
            prev_dice_tracker = self.dice_tracker
            self.dice_tracker = {}
            return {
                    "highest_rolled": "tie",
                    "prev_dice_tracker": prev_dice_tracker,
                    "diceTracker": self.dice_tracker
                }
        
        # Used for building turn queue
        self.dice_winner = highest_roller

        print(self.dice_tracker)
        {k: v for k, v in sorted(self.dice_tracker.items(), key=lambda item: item[1])}

        print(self.dice_tracker)

        for key, val in self.dice_tracker.items():
            print(key)
            self.character_selection_order.append(key)

        return {
            "dicePhase": "finishedRoll",
            "highest_roller": highest_roller,
            "highest_rolled": highest_rolled,
            "diceTracker": self.dice_tracker
        }

    # Should not be hit if empty...
    def get_next_character_selector(self):
        next_character = self.character_selection_order[0]
        del self.character_selection_order[0]
        return next_character

    def get_player(self, username):
        for player in self.players:
            if player.username == username:
                print('Founder Player Object for ' + username)
                return player
        print('Found no player object for ' + username)

    def assign_character_to_player(self, username, character):
        player = self.get_player(username)
        player.character = character

    def delete_character_from_selection(self, character):
        for i in range(len(self.character_selection_list)):
            if self.character_selection_list[i] == character:
                del self.character_selection_list[i]
                return
    
    def build_turn_order(self):
        # Get highest rolled character name,
        highest_rolled_player = self.get_player(self.dice_winner)

        # find spot in game_board_character_order
        character = self.GameBoard.game_board_character_order[0]

        while character != highest_rolled_player.character:
            popped_character = self.GameBoard.game_board_character_order[0]
            del self.GameBoard.game_board_character_order[0]
            self.GameBoard.game_board_character_order.append(popped_character)
            character = self.GameBoard.game_board_character_order[0]
        
        for character in self.GameBoard.game_board_character_order:
            for player in self.players:
                if player.character == character:
                    self.turn_order.append(player.username)

    def get_next_player_turn(self):
        next_player = self.turn_order[0]
        del self.turn_order[0]
        self.turn_order.append(next_player)
        return next_player