import React, { useState, useImperativeHandle, forwardRef, useRef } from 'react';
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js';
import { ChessInstance } from 'chess.js';

const ChessFn = Chess as any as { new(): ChessInstance; }; // This line is required because the Chess.js typings and exports are a bit unusual

const MyChessboard = forwardRef((props, ref) => {
  const [game, setGame] = useState(new ChessFn());
  const subscribers = useRef([]);

  const onDrop: React.ComponentProps<typeof Chessboard>['onDrop'] = ({ sourceSquare, targetSquare }) => {
    const newGame = new ChessFn(game.fen());
    let move = null;

    try {
        move = newGame.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q',
      });
    } catch (error) {
      console.error("There was an error moving the piece: ", error);
    }

    if (move !== null) {
      setGame(newGame);

      // Notify subscribers of the change
      subscribers.current.forEach((callback) => callback(newGame.fen()));
    }
  };

  const loadFEN = (fenString) => {
    const newGame = new ChessFn(fenString);
    setGame(newGame);
  };

  useImperativeHandle(ref, () => ({
    getFEN: () => game.fen(),
    subscribeToChanges: (callback) => {
      subscribers.current.push(callback);

      return () => {
        subscribers.current = subscribers.current.filter((cb) => cb !== callback);
      };
    },
    loadFEN: loadFEN,
  }));

  return (
    <div>
      <Chessboard
        position={game.fen()}
        onDrop={onDrop}
      />
    </div>
  );
});

export default MyChessboard;
