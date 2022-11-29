import Board from "./components/gameMechanics/board/Board";
import { SocketProvider } from "./context/SocketContext";
import BoardContainer from "./components/boardContainer";
import { PlayerContextProvider } from "./context/PlayerContext";

function App() {
  return (
    <PlayerContextProvider>
      <SocketProvider>
        <BoardContainer />
      </SocketProvider>
    </PlayerContextProvider>
  );
}

export default App;
