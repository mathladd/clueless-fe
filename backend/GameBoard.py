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
            for i in range(total_cards/total_players):                  # amount of cards each player gets
                player.cards.append(all_cards.pop(0))
            
            # {Dakota: ['knife', 'living room'], Shaheer: ['gun', 'balcony']}
            player_and_cards[player.user_name] = player.cards

        if len(all_cards) > 0:
            self.left_over_cards = all_cards


        return player_and_cards
        # player_and_cards = player names + cards they have
        # left_over_cards has all left over cards
