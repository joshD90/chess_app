import React from "react";
import "./waitingSpinner.scss";
import { CircularProgress } from "@mui/material";

function WaitingSpinner({ grid }) {
  return (
    <div className="spinnerDiv" style={{ display: !grid ? "flex" : "none" }}>
      Please Wait While We Find Someone To Play With You
      <div>
        <CircularProgress
          style={{
            color: "inherit",
            fontSize: "3rem",
            width: "100%",
            height: "100%",
          }}
        />
      </div>
    </div>
  );
}

export default WaitingSpinner;
