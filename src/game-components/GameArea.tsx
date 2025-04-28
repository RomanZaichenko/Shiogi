import '../styles/GameArea.css'
import BoardElement from "./BoardElement.tsx";
import CapturedFiguresArea from "./CapturedFiguresArea.tsx";


function GameArea() {

    return (
        <main id="game-area">
          <CapturedFiguresArea side="left"/>
          <BoardElement/>
          <CapturedFiguresArea side="right"/>
        </main>
    );
}

export default GameArea;