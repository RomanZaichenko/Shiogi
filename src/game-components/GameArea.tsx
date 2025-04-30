import '../styles/GameArea.css'
import BoardElement from "./BoardElement.tsx";
import CapturedFiguresArea from "./CapturedFiguresArea.tsx";


function GameArea() {

    return (
        <main id="game-area">
          <CapturedFiguresArea side="left" owner="gote"/>
          <BoardElement/>
          <CapturedFiguresArea side="right" owner="sente"/>
        </main>
    );
}

export default GameArea;