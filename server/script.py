import sys
import json
import chess
import random
from minimax import Minimax
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
    minimax = Minimax(json_input)
    # Get the FEN string after applying the move
    fen_string = board.fen()
    # Print the modified JSON to be captured by the Node.js script
    print(json.dumps({"new_fen":str(fen_string), "move":str(move), "current_score": str(minimax.static_eval())}))
except Exception as e:
    print(json.dumps({"error": str(e)}))