import React, { useRef, useEffect, useState } from 'react';
import './StrategyCanvas.css'; // Import CSS file for styling
import './MyChessboard.tsx'
import MyChessboard from './MyChessboard.tsx';
import PieceValueForm from './PieceValueForm';
import PositionEvaluationForm from './PositionEvaluationForm';
import CanvasDrawing from './CanvasDrawing';
import StrategySummary from './StrategySummary';

const StrategyCanvas = () => {
  const chessboardRef = useRef();
  const [buttonState, setButtonState] = useState('Minimax'); 
  
  const [fen, setFen] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');  // FEN state
  const getChessboardFEN = () => {
    const fenString = chessboardRef.current.getFEN();
    setFen(fenString);  // Update the FEN state
    // You can now use this FEN however you like.
  };

  useEffect(() => {
    const unsubscribe = chessboardRef.current.subscribeToChanges(setFen);

    return () => {
      unsubscribe();
    };
  }, []);

  const [pieceValues, setPieceValues] = useState({
    pawn: 1,
    knight: 3,
    bishop: 3,
    rook: 5,
    queen: 9,
    king: 0,
  });

  const [positionEvaluation, setPositionEvaluation] = useState({
    mobility: 70,
    pawnStructure: 60,
    kingSafety: 80,
    pieceActivity: 90,
  });


  const handleButtonClick = (buttonName) => {
    setButtonState(buttonName)
    if (buttonName === 'Fetch move') {
      // Create the JSON payload for the request
      const payload ={selectedValues:pieceValues,evaluation:positionEvaluation,fenString:fen} 
  
      // Make the API call to the backend
      fetch('http://54.211.66.81:5000/api/fetch_best_move', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then((response) => {
          response.json().then((r) => {console.log(r) ; setFen(r.new_fen) ; chessboardRef.current.loadFEN(r.new_fen);})
          // Handle the response from the server
          if (response.ok) {
            // Request was successful
            // Handle the successful response
          } else {
            // Request failed
            // Handle the failed response
          }
        })
        .catch((error) => {
          // Handle any errors
          console.error(error);
        });
    }
  };

  return (
    <div className="strategy-canvas-wrapper">
      <table className="canvas-table">
        <tbody>
          <tr>
            <td className="canvas-cell">
              {buttonState === 'Minimax' ? (
                <div className="piece-value-form-wrapper">
                  <CanvasDrawing />
                </div>
              ) : buttonState === 'Piece value' ? (
                <div className="canvas-wrapper">
                  <div className="piece-value-form-wrapper">
                  <PieceValueForm onFormSubmit={setPieceValues} />
                  </div>
                </div>
              ) : buttonState === 'Position' ? (
                <div className="canvas-wrapper">
                  <div className="piece-value-form-wrapper">
                  <PositionEvaluationForm onFormSubmit={setPositionEvaluation} />
                  </div>
                </div>
              ) : (
                <div className="piece-value-form-wrapper">
                  <h1>{buttonState}</h1>
                </div>
              )}
            </td>
            <td className="action-buttons-cell">
              <div className="action-buttons">
                <button onClick={() => handleButtonClick('Position')}>Position</button>
                <button onClick={() => handleButtonClick('Minimax')}>Minimax</button>
                <button onClick={() => handleButtonClick('Piece value')}>Piece value</button>
                <button className="fetch-buttons" onClick={() => handleButtonClick('Fetch move')}>Fetch next move</button>
              </div>
            </td>
            <td className="chess-container-cell">
              <div className="chess-container">
                 <MyChessboard ref={chessboardRef} />
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan="3">
              <StrategySummary
                pieceValues={pieceValues}
                mobility={positionEvaluation.mobility}
                pawnStructure={positionEvaluation.pawnStructure}
                kingSafety={positionEvaluation.kingSafety}
                pieceActivity={positionEvaluation.pieceActivity}
                fenString={fen}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  );
};

export default StrategyCanvas;
