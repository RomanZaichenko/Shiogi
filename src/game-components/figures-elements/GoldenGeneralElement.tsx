import {useEffect, useState} from "react";
import {Board, useBoard} from "../../classes/Board.ts";

interface GoldenGeneralElementProps {
  row: number;
  col: number;
}

function GoldenGeneralElement({row, col}: GoldenGeneralElementProps){
  const {getBoardCell, displayAvailableMoves, clearMoves} = useBoard();
  const cell = getBoardCell(row, col);
  const board = Board.instance;
  const [tick, setTick] = useState(0);

  const onGoldenGeneralClick = () => {
    board.selectedCell = cell;
    console.log("g general");
    board.goldenGeneralMoveDisplay.displayMoves(cell);
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
        <div className="figure" onClick={onGoldenGeneralClick}
        draggable
        onDragStart={onGoldenGeneralClick}
        onDragEnd={() => {
          board.selectedCell = null;
          clearMoves();
        }}>
            <img src="src/images/figures/golden_general.png" alt=""/>
        </div>
    )
}

export default GoldenGeneralElement;