import React, { useState } from "react";

export const PlayerContext = React.createContext();

export const PlayerContextProvider = ({ children }) => {
  const [player, setPlayer] = useState({ color: "exactly", turn: "pink" });

  return (
    <PlayerContext.Provider value={{ player, setPlayer }}>
      {children}
    </PlayerContext.Provider>
  );
};
