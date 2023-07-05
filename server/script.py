import sys
import json
import chess
import random
# Read the JSON input from the command line arguments
json_input = json.loads(sys.argv[1])
try:
    board = chess.Board(json_input["fenString"])
    move=random.choice(list(board.legal_moves))
    # Perform some processing on the JSON data (e.g., modify it)
    # Here, we simply add a new key-value pair to the JSON object
    json_input['processed'] = True
    res = {"move":move}

    # Apply the move to the board
    board.push(move)

    # Get the FEN string after applying the move
    fen_string = board.fen()
    # Print the modified JSON to be captured by the Node.js script
    print(json.dumps({"new_fen":str(fen_string), "move":str(move)}))
except:
    print(json.dumps({"move":"bad request"}))