import Board from "./components/gameMechanics/board/Board";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/homePage/HomePage";
import BoardContainer from "./components/boardContainer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/game" element={<BoardContainer />} />
      </Routes>
    </Router>
  );
}

export default App;
