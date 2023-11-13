# Tiles are grid units on a board
# Can be a room or hallyway tile
from Tile import Tile
import random

class GameBoard:
    def __init__(self):
        # cards from game
        self.weapon_cards = ['Candlestick', 'Dagger', 'Lead pipe', 
                             'Revolver', 'Rope', 'Spanner']

        self.room_cards = ['Kitchen', 'Ballroom', 'Conservatory', 
                           'Dining Room', 'Library', 'Billard Room',
                           'Lounge', 'Study', 'Hall']

        self.characters = ['Miss Scarlett', 'Colonel Mustard', 
                           'Mrs. White', 'Mr. Green', 
                           'Mrs. Peacock', 'Professor Plum']

        self.winning_combo = [] 

        # To be filled in after dice roll.
        self.turn_order = []

        # to be filled later with left over cards
        self.left_over_cards = []
        
        # fill with room objects
        self.rooms = []
        
        # Assign to player object of who is currently suggesting
        self.current_suggester = None

        # 2D Game room grid
        self.rows, self.cols = (5, 5)
        self.game_board = [[None for i in range(self.rows)] for i in range(self.cols)]
        
        # gameboard character order
        self.game_board_character_order = [
            "Miss Scarlett", "Colonel Mustard", 
            "Mrs. White", "Mr. Green", 
            "Mrs. Peacock", "Professor Plum"
        ]

    # Assign rooms to board
    def setup_board(self):
        room_array = [
            ["Study", "Hallway", "Hall", "Hallway", "Lounge"],
            ["Hallway", None, "Hallway", None, "Hallway"],
            ["Library", "Hallway", "Billiard Room", "Hallway", "Dining Room"],
            ["Hallway", None, "Hallway", None, "Hallway"],
            ["Conservatory", "Hallway", "Ball-room", "Hallway", "Kitchen"]
        ]
        for i in range(self.rows):
            for j in range(self.cols):
                self.game_board[i][j] = Tile(room_array[i][j])

        return self.get_gameboard()

    def get_gameboard(self):
        response = {}
        for i in range(self.rows):
            for j in range(self.cols):
                response[str(i) + "," + str(j)] = {
                    "name": self.game_board[i][j].tile_name,
                    "players": self.game_board[i][j].players,
                    "weapons": self.game_board[i][j].weapons,
                }
        return response


    def select_murder_scene(self):
        random.shuffle(self.weapon_cards)
        random.shuffle(self.room_cards)
        random.shuffle(self.characters)

        self.winning_combo.append(self.weapon_cards.pop(0))
        self.winning_combo.append(self.room_cards.pop(0))
        self.winning_combo.append(self.characters.pop(0))

        return self.winning_combo

    def distribute_cards(self, player_list):
        # combine all cards
        all_cards = self.weapon_cards + self.room_cards + self.characters

        # shuffle cards
        random.shuffle(all_cards)                                       # will need some error handling so one player wont egt only weapon cards

        total_cards = len(all_cards)
        total_players = len(player_list)
        player_and_cards = {}
        
        # iterate over all players
        for player in player_list:
            # add the top card into a players card list total_cards/total_players
            for i in range(int(total_cards/total_players)):                  # amount of cards each player gets
                player.cards.append(all_cards.pop(0))
            
            # {Dakota: ['knife', 'living room'], Shaheer: ['gun', 'balcony']}
            player_and_cards[player.username] = player.cards

        if len(all_cards) > 0:
            self.left_over_cards = all_cards

        return player_and_cards
        # player_and_cards = player names + cards they have
        # left_over_cards has all left over cards

    