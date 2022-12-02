import React, { useState, useEffect } from "react";

function Clock({ player }) {
  const [seconds, setSeconds] = useState(600);

  useEffect(() => {
    const reduceSecond = () => {
      if (!player.current.turn) return;
      setSeconds((prev) => prev - 1);
    };
    const timer = setInterval(reduceSecond, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <h3>
        {Math.floor(seconds / 60)} :{" "}
        {(seconds % 60).toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}
      </h3>
    </div>
  );
}

export default Clock;
