import chess
import chess.engine
import os 
class Minimax():
    def __init__(self,json_data) -> None:
        self.piece_valuation = json_data["selectedValues"]
        self.goals = json_data["evaluation"]
        self.position = chess.Board(json_data["fenString"])
        self.legal_moves = self.get_legal_moves()  # Initialize self.legal_moves with available moves
        self.valuation = self.static_eval()

        

    def get_legal_moves(self):
        legal_moves = []  # Initialize an empty list for storing FEN positions
        for move in self.position.legal_moves:
            self.position.push(move)
            legal_moves.append(self.position.fen())
            self.position.pop()
        return legal_moves      
      
    def static_eval(self):
        white_piece_count = {chess.PAWN: 0, chess.KNIGHT: 0, chess.BISHOP: 0, chess.ROOK: 0, chess.QUEEN: 0, chess.KING: 0}
        black_piece_count = {chess.PAWN: 0, chess.KNIGHT: 0, chess.BISHOP: 0, chess.ROOK: 0, chess.QUEEN: 0, chess.KING: 0}

        piece_values = {chess.PAWN: self.piece_valuation["pawn"], chess.KNIGHT: self.piece_valuation["knight"],
                            chess.BISHOP: self.piece_valuation["bishop"], chess.ROOK: self.piece_valuation["rook"],
                            chess.QUEEN: self.piece_valuation["queen"], chess.KING: self.piece_valuation["king"]}


        for square in chess.SQUARES:
            piece = self.position.piece_at(square)
            if piece is not None:
                if piece.color == chess.WHITE:
                    white_piece_count[piece.piece_type] += 1
                elif piece.color == chess.BLACK:
                    black_piece_count[piece.piece_type] += 1

        sumOfWhite = 0
        sumOfBlack = 0

        for piece_type, count in white_piece_count.items():
            sumOfWhite += count * piece_values[piece_type] 

        for piece_type, count in black_piece_count.items():
            sumOfBlack += count * piece_values[piece_type]         

        total_piece_score = sumOfWhite - sumOfBlack

        stockfish_path = "./stockfish.exe"
        pawn_score = 0     

        return total_piece_score + pawn_score
        
    
