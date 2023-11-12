# Player Class
# Holds player username, state, can_win, and cards dealt

class Player:
    # all players should start off as in lobby once signed in
    def __init__(self, websocket, username, state):
        # Connection
        self.websocket = websocket
        
        # username for player
        self.username = username

        # STATES = IN_LOBBY, IN_ROOM, IN_GAME, WAITING_TURN, 
        #          CURRENT_TURN, SUGGESTING, ACCUSING
        self.state = state

        # Character assigned in lobby
        # Allow characters to choose in order or rolled dice.
        self.character = None

        # To be filled in after winning combo chosen
        self.cards = []

        # Every card is a true possibilty unless marked false by player
        self.clue_sheet = {
            "card1" : True,
            "card2" : True
        }

    ## Player State functionality
    # function for changing player state

    ## Accusaion functionality
    # function for alter can win if accused == false

    ## Player Cards
    # function for getting player cards
   
    ## Clue Sheet
    # function for getting clue sheet

    # function for altering clue sheet
    