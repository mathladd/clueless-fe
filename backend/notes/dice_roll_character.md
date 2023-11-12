Dice Roll
Broadcast Message
{
    responseFor: rollDice,
    current_turn: "Duy",
}

From front end
api_request_from_front_end = rolledDice
{
    lobby_name: "lobby1",
    current_turn: "Duy",
    number: 3

}

Broadcast Message
{
    responseFor: rolledDice,
    current_turn: "Duy",
    number: 3
}

dice_turn_order_queue = [Duy, Dakota, ..]

dice_dictionary {
    Duy: 3,
    Dakota: 1,
    ...
}

getHighestRolled():
    for key, val, in dice_dict:


# After dice roll...

# Notification of phase in game start ...
Broadcast Message
{
    responseFor: finishedRolledDice,
    turnOrder: ["duy", ...]
}


Broadcast Message
{
    responseFor: characterSelect,
    characterSelectionOrder: ["Duy", "Dakota", ...]
    characters: ["Plum", "Green", etc..]
    
}

front end response
{
    response: characterSelect,
    username: "Duy",
    lobbby: "lobby1",
    chosenCharacter: "Plum"
}

Broadcast Message
{
    responseFor: characterSelect,
    characterSelectionOrder: ["Dakota", ...]
    characters: ["Green", etc..]
    
}
...

# After Character Selection
# Notification of phase change from character select to gameplay logic
#   turn order...


Broadcast Message
{
    responseFor: characterSelectinFinished,
    playerData: {
        Dakota: {
            character: Green
        },
        Duy: {
            character: Plum
        },
    }
}


# After all character selection data sent, setup gameboard

Broadcast Message
{
    responseFor: currentTurn,
    username: "Anthony",
}


front end response
{
    response: playerMove,
    username: "Anthony",
    lobbby: "lobby1",
    prev_coord: -1,
    next_coord: "0,3"
}


Broadcast Message
GameBoard Response
{

    game_board_response = {
        "0,0": {
            players: ["Duy"],
            weapons: [""],
            name: "Study"
        },
        "0,1": {
            players: [""],
            weapons: [],
            name: "Hallway"
        },
        "0,3": {
            players: [""],
            weapons: [],
            name: "Hallway"
        },
        "0,4": {
            players: [""],
            weapons: [],
            name: "Hallway"
        },
        "1,0": {
            players: ["Anthony"],
            weapons: [],
            name: "Hallway"
        },
        ...
    }

}


Broadcast Message
{
    responseFor: currentTurn,
    username: "Duy",
}

front end response
{
    response: "playerMove",
    username: "Duy",
    lobbby: "lobby1",
    prev_coord: -1,
    next_coord: "1,0"
}
