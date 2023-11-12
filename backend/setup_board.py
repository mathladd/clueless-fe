rows, cols = (5, 5)

room_array = [
    ["Study", "Hallway", "Hall", "Hallway", "Lounge"],
    ["Hallway", None, "Hallway", None, "Hallway"],
    ["Library", "Hallway", "Billiard Room", "Hallway", "Dining Room"],
    ["Hallway", None, "Hallway", None, "Hallway"],
    ["Conservatory", "Hallway", "Ball-room", "Hallway", "Kitchen"]
]

game_board = [[0 for i in range(rows)] for i in range(cols)]

for i in range(rows):
    for j in range(cols):
        game_board[i][j] = room_array[i][j]


for i in range(rows):
    for j in range(cols):
        print(game_board[i][j])