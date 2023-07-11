import React from 'react';
import './StrategySummary.css'; // Import CSS file for styling

const StrategySummary = ({ pieceValues, mobility, pawnStructure, kingSafety, pieceActivity, fenString }) => {
  return (
    <div className="strategy-summary">
      <h2>Strategy Summary</h2>
      <table className="summary-table">
        <tbody>
          <tr>
            <td className="piece-values-column">
              <table>
                <thead>
                  <tr>
                    <th>Piece</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(pieceValues).map(([piece, value]) => (
                    <tr key={piece}>
                      <td>{piece}</td>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
            <td className="position-evaluation-column">
              <table>
                <tbody>
                  <tr>
                    <td>Mobility:</td>
                    <td>{mobility}</td>
                  </tr>
                  <tr>
                    <td>Pawn Structure:</td>
                    <td>{pawnStructure}</td>
                  </tr>
                  <tr>
                    <td>King Safety:</td>
                    <td>{kingSafety}</td>
                  </tr>
                  <tr>
                    <td>Piece Activity:</td>
                    <td>{pieceActivity}</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td colSpan="4">
              FEN String: {fenString}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StrategySummary;
