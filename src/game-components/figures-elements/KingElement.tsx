import {useState, useEffect} from "react";
import {Board, useBoard} from "../../classes/Board.ts";

interface KingElementProps {
  row: number;
  col: number;
  owner: string;
}

function KingElement({row, col, owner}: KingElementProps) {
  const {getBoardCell, displayAvailableMoves, clearMoves} = useBoard();
  const cell = getBoardCell(row, col);
  const board = Board.instance;
  const [tick, setTick] = useState(0);

  const onKingClicked = () => {
    if ((board.currentTurn == "sente" && !cell.displayRotated) ||
      (board.currentTurn == "gote" && cell.displayRotated)) {
      if (cell.canCapture){
        cell.canCapture = false;
      }
      board.selectedCell = cell;
      board.kingMoveDisplay.displayMoves(cell);
      const movesToDisplay = board.cellsToMoveDisplay;

      movesToDisplay.filter((move) => {
        board.mediator.isLegalMove(cell.figureOn, cell, move);
      })
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