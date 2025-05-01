import {useState, useEffect} from "react";
import {Board, useBoard} from "../../classes/Board.ts";

interface KingElementProps {
  row: number;
  col: number;
  isCaptured: boolean;
  owner: string;
  setGameStage: (stage: "menu" | "game" | "gameOver") => void;
}

function KingElement({row, col, isCaptured, setGameStage}: KingElementProps) {
  const board = Board.instance;

  useEffect(() => {
    if (isCaptured) {
      setGameStage("gameOver");
    }
  }, [isCaptured, setGameStage]);

 if (isCaptured) {
   board.clearBoard();
   return;
 }
  const {getBoardCell, displayAvailableMoves, clearMoves} = useBoard();
  const cell = getBoardCell(row, col);
  const [tick, setTick] = useState(0);




  const onKingClicked = () => {

    if ((board.currentTurn == "sente" && !cell.displayRotated) ||
      (board.currentTurn == "gote" && cell.displayRotated)) {
      if (cell.canCapture){
        cell.canCapture = false;
      }

      board.selectedCell = cell;
      board.kingMoveDisplay.displayMoves(cell);
      const movesToDisplay = board.cellsToMoveDisplay; //change
      displayAvailableMoves(movesToDisplay);
    }
  }

  useEffect(() => {

  }, [cell]);

  useEffect(() => {
    const listener = () => {
      setTick(prevTick => prevTick+1);
    };

    board.subscribe(listener);

    return () => {
      board.unsubscribe(listener);
    }
  }, [board]);
    return (
        <div className="figure" onClick={onKingClicked}
        draggable
        onDragStart={onKingClicked}
        onDragEnd={() => {
          board.selectedCell = null;
          clearMoves();
          board.clearCapturesDisplay();
        }}>
            <img src="src/images/figures/king.png" alt=""/>
        </div>
    )
}

export default KingElement;