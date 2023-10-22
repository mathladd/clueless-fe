# Tiles are grid units on a board
# Can be a room or hallyway tile
import Tile
import random

class GameBoard:
    def __init__(self):
        # cards from game
        self.weapon_cards = ['knife', 'gun']
        self.room_cards = ['living room', 'kitchen', 'balcony']
        self.characters = ['Anthony', 'Dakota', 'Duy', 'Shaheer']

        self.winning_combo = [] 

        # To be filled in after dice roll.
        self.turn_order = []

        # to be filled later with left over cards
        self.left_over_cards = []
        
        # fill with room objects
        self.rooms = []

        # 2D Game room grid
        rows, cols = (5, 5)
        self.game_board = [[0]*cols]*rows

        # Assign rooms to board

    def setup_board():
        None
        # for loop over board
        # assign rooms to specific coords
        # Response {
        #   "0,0": {
        #           "name": kitchen,
        #           "players": [],
        #           "weapons": []
        #        },
        #   "0,1": {
        #           "name": "hallway",
        #           "players": ["Hashem"]
        #        }
        # }    


    def select_murder_scene(self):
        random.shuffle(self.weapon_cards)
        random.shuffle(self.room_cards)
        random.shuffle(self.characters)

        self.winning_combo.append(self.weapon_cards.pop(0))
        self.winning_combo.append(self.room_cards.pop(0))
        self.winning_combo.append(self.characters.pop(0))

    # def distribute_cards(self, player_list):
    # combine all cards
    # shuffle cards
    # total_cards = len(combined_cards)
    # total_players = len(players)
    # player_counter = 0
    # for each player in player_list:
    #   for i in range(total_cards/total_players)
    #    
    #       player_list[player_counter].cards.append[combined_cards.pop[0]]

    # if len(combined_cards) > 0:
    # left_over_cards = combined_cards


    # Get Gameboard Data
    # return players names, cards
    # return left over cards
    




