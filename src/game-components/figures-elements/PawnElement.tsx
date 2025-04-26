import {createContext, useEffect, useState} from "react";
import {Board, useBoard} from "../../classes/Board.ts";


interface PawnElementProps {
  row: number;
  col: number;
}

function PawnElement({ row, col }: PawnElementProps) {
  const {getBoardCell, displayAvailableMoves, clearMoves} = useBoard();
  const cell = getBoardCell(row, col);
  const board = Board.instance;
  const [tick, setTick] = useState(0);

  const onPawnClick = () => {
    board.selectedCell = cell;
    console.log(cell);
    board.pawnMoveDisplay.displayMoves(cell);
    const movesToDisplay = board.cellsToMoveDisplay;
    console.log(movesToDisplay);
    displayAvailableMoves(movesToDisplay);
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
        <div className="figure" onClick={onPawnClick}
        draggable
        onDragStart={onPawnClick}
        onDragEnd={() => {
          board.selectedCell = null;
          clearMoves();
        }}>

            <img src="src/images/figures/pawn.png" alt=""/>
        </div>
    )
}

export default PawnElement;