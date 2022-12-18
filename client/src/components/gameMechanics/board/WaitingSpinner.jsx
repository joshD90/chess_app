import React from "react";
import "./waitingSpinner.scss";

function WaitingSpinner({ grid }) {
  return (
    <div className="spinnerDiv" style={{ display: !grid ? "flex" : "none" }}>
      <div className="knightBackground rotate"></div>
      <h1>Please Wait While We Find Someone To Play With You</h1>
    </div>
  );
}

export default WaitingSpinner;
