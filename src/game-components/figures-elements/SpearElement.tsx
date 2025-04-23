import {Board, useBoard} from "../../classes/Board.ts";
import {useEffect, useState} from "react";

interface SpearElementProps {
  row: number;
  col: number;
}

function SpearElement({row, col}: SpearElementProps) {
  const {getBoardCell, displayAvailableMoves, clearMoves} = useBoard();
  const cell = getBoardCell(row, col);
  const board = Board.instance;
  const [tick, setTick] = useState(0);

  const onSpearClick = () => {
    board.spearMoveDisplay.displayMoves(cell);
    const movesToDisplay = board.cellsToMoveDisplay;
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
        <div className="figure" onClick={onSpearClick}>
            <img src="src/images/figures/spear.png" alt=""/>
        </div>
    )
}

export default SpearElement;