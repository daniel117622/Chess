import React, { useState } from 'react';
import './PositionEvaluationForm.css';

const PositionEvaluationForm = ({ onFormSubmit }) => {
  const [parameters, setParameters] = useState({
    mobility: '',
    pawnStructure: '',
    kingSafety: '',
    pieceActivity: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setParameters((prevParameters) => ({
      ...prevParameters,
      [name]: parseInt(value, 10), // parse the value to an integer before setting the state
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call onFormSubmit with the current parameters
    onFormSubmit(parameters);
  };

  return (

<form onSubmit={handleSubmit} className="position-evaluation-form">
  <div className="form-group slider-container">
    <label htmlFor="mobility">Mobility:</label>
    <input
      type="range"
      id="mobility"
      name="mobility"
      min="0"
      max="100"
      value={parameters.mobility}
      onChange={handleChange}
    />
    <span className="slider-value">{parameters.mobility}</span>
  </div>
  <div className="form-group slider-container">
    <label htmlFor="pawnStructure">Pawn Structure:</label>
    <input
      type="range"
      id="pawnStructure"
      name="pawnStructure"
      min="0"
      max="100"
      value={parameters.pawnStructure}
      onChange={handleChange}
    />
    <span className="slider-value">{parameters.pawnStructure}</span>
  </div>
  <div className="form-group slider-container">
    <label htmlFor="pieceActivity">Piece Activity:</label>
    <input
      type="range"
      id="pieceActivity"
      name="pieceActivity"
      min="0"
      max="100"
      value={parameters.pieceActivity}
      onChange={handleChange}
    />
    <span className="slider-value">{parameters.pieceActivity}</span>
  </div>
  <div className="form-group slider-container">
    <label htmlFor="kingSafety">King Safety:</label>
    <input
      type="range"
      id="kingSafety"
      name="kingSafety"
      min="0"
      max="100"
      value={parameters.kingSafety}
      onChange={handleChange}
    />
    <span className="slider-value">{parameters.kingSafety}</span>
  </div>
  <button type="submit" className="submit-button">Submit</button>
</form>

  
  );
};

export default PositionEvaluationForm;

