import React from "react";
import "./waitingSpinner.scss";
import { CircularProgress } from "@mui/material";
import knightBackground from "../../../assets/knightBackground.jpg";

function WaitingSpinner({ grid }) {
  return (
    <div className="spinnerDiv" style={{ display: !grid ? "flex" : "none" }}>
      <div className="knightBackground rotate">
        <img src={knightBackground} className="" />
      </div>
      <h1>Please Wait While We Find Someone To Play With You</h1>
      <div>
        {/* <CircularProgress
          style={{
            color: "inherit",
            fontSize: "3rem",
            width: "100%",
            height: "100%",
          }}
        /> */}
      </div>
    </div>
  );
}

export default WaitingSpinner;
