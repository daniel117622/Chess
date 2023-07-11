import React, { useState } from 'react';
import "./PieceValueForm.css"

const PieceValueForm = ({ onFormSubmit }) => {
  const [pieceValues, setPieceValues] = useState({
    pawn: 1,
    knight: 3,
    bishop: 3,
    rook: 5,
    queen: 9,
    king: 0,
  });



  
  const handleChange = (event, piece) => {
    const { value } = event.target;
    setPieceValues((prevState) => ({
      ...prevState,
      [piece]: parseInt(value, 10),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call onFormSubmit with the current piece values
    onFormSubmit(pieceValues);
  };

    return (
    <form onSubmit={handleSubmit}>
      <table className="piece-value-form">
        <tbody>
          <tr>
            <td>Pawn:</td>
            <td>
              <input
                type="number"
                value={pieceValues.pawn}
                onChange={(event) => handleChange(event, 'pawn')}
              />
            </td>
          </tr>
          <tr>
            <td>Knight:</td>
            <td>
              <input
                type="number"
                value={pieceValues.knight}
                onChange={(event) => handleChange(event, 'knight')}
              />
            </td>
          </tr>
          <tr>
            <td>Bishop:</td>
            <td>
              <input
                type="number"
                value={pieceValues.bishop}
                onChange={(event) => handleChange(event, 'bishop')}
              />
            </td>
          </tr>
          <tr>
            <td>Rook:</td>
            <td>
              <input
                type="number"
                value={pieceValues.rook}
                onChange={(event) => handleChange(event, 'rook')}
              />
            </td>
          </tr>
          <tr>
            <td>Queen:</td>
            <td>
              <input
                type="number"
                value={pieceValues.queen}
                onChange={(event) => handleChange(event, 'queen')}
              />
            </td>
          </tr>
          <tr>
            <td>King:</td>
            <td>
              <input
                type="number"
                value={pieceValues.king}
                onChange={(event) => handleChange(event, 'king')}
              />
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <button type="submit" className="submit-button">Submit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};



export default PieceValueForm;
