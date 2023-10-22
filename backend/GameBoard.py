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

    def setup_board(self):
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

    def distribute_cards(self, player_list):
        # combine all cards
        all_cards = self.weapon_cards + self.room_cards

        # shuffle cards
        random.shuffle(all_cards)                                       # will need some error handling so one player wont egt only weapon cards

        total_cards = len(all_cards)
        total_players = len(player_list)
        player_and_cards = {}
        #player_counter = 0

        for player in player_list:
            temp_cards = []
            for i in range(total_cards/total_players):                  # amount of cards each player gets
                self.characters[i].cards.temp_cards.append(all_cards.pop(0))
                #player_list[i].cards.append(all_cards.pop(0))          # specific cards each players gets   
                #player_counter += 1
            
            # {Dakota: ['knife', 'living room'], Shaheer: ['gun', 'balcony']}
            player_and_cards[player] = temp_cards
            temp_cards.clear()

        if len(all_cards) > 0:
            self.left_over_cards = all_cards

        # Get Gameboard Data
        # return players names, cards
        # return left over cards
        
        return_left_over_cards(self.left_over_cards )
        return player_and_cards
        # player_and_cards = player names + cards they have
        # all_cards has all left over cards

def return_left_over_cards(left_over):
    return left_over
    




