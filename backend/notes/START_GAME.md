# To start Game
    Everyone needs to be ready
    Lobby host needs to start the game
    Starting the game kicks off the dice roll

# Dice roll
    Players roll in the order the joined the lobby
    
    the dicephase starts off as 'startingDiceRoll'.
    Once someone else has a turn, the dicePhase turns to 'rollingDice'

    Once all players have rolled, the server will determine if a tie happened, or if someone won

    If a tie happened, you will get a dicePhase of 'startingDiceRoll'
    , moving from rollingDice phase to startingDiceRoll clears the dice tracker and front end needs to restart the dice process.

    If no ties, and a winner is detected,
    you will get a dicePhase of 'finishedDiceRoll'

    The backend will allow characer to then make character selections based off of who had the highest roll

# Character selection

    person who had highest dice roll goes first, then second.. and so on.
    Characters are removed from the available options to choose from

    once the last person chose a character, the gameboard is assigned rooms, and the turn order is determined by the highest dice roller and who they chose as a character. The turn order is clockwise from the highest dice roller and their character.

# Turns for game
    backend sends the front end a responseFor "currentTurn"
    with a attribute of "currentTurn": "username"

