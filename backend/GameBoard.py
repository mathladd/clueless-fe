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

    def select_murder_scene(self):
        random.shuffle(self.weapon_cards)
        random.shuffle(self.room_cards)
        random.shuffle(self.characters)

        self.winning_combo.append(self.weapon_cards.pop(0))
        self.winning_combo.append(self.room_cards.pop(0))
        self.winning_combo.append(self.characters.pop(0))
    




