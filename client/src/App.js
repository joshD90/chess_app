import Board from "./components/gameMechanics/board/Board";
import { SocketProvider } from "./context/SocketContext";
import BoardContainer from "./components/boardContainer";

function App() {
  return (
    <SocketProvider>
      <BoardContainer />
    </SocketProvider>
  );
}

export default App;
