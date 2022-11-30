import { useContext } from "react";
import Board from "./components/gameMechanics/board/Board";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/homePage/HomePage";
import BoardContainer from "./components/boardContainer";
import { SocketContext } from "./context/SocketContext";

function App() {
  const socket = useContext(SocketContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={socket && <Homepage />} />
        <Route path="/game" element={socket && <BoardContainer />} />
      </Routes>
    </Router>
  );
}

export default App;
