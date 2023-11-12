front end response
{
    response: "makeSuggestion",
    username: "Duy",
    lobbby: "lobby1",
    coords: 0,0,
    suggested_player: "Anthony",
    weapon: "spoon",
    room: "Study"
}

for row in board:
    for col in board:
        if tile has suggested_player:

            # Anthony getting removed from his current room
            tile.remove(suggested_player)

            # Anthony moving into duys room
            suggested_room.players.append[suggested_player]

broadcast message
{
    response: "makeSuggestion",
    username: "Duy",
    lobbby: "lobby1",
    coords: 0,0,
    suggested_player: "Anthony",
    weapon: "spoon",
    room: "Study"
}

Suggestion Phase
# make a list of everyone but suggester

# broadcast current person who must how cards that match disprove

broadcast message
{
    response: "currentSuggestionTurn",
    suggest_order = ["Dakota", Anthony, Shaheer]
}

front end response
{
    responseFor: "suggestionResponse",
    username: "Dakota",
    lobbby: "lobby1",
    matching_cards: []
}

broadcast message
{
    response: "currentSuggestionTurn",
    suggest_order = [Anthony, Shaheer]
}

front end response
{
    responseFor: "suggestionResponse",
    username: "Dakota",
    lobbby: "lobby1",
    matching_cards: [Study]
}
