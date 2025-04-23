import {useEffect, useState} from "react";
import {Board, useBoard} from "../../classes/Board.ts";

interface RookElementProps {
  row: number;
  col: number;
}

function RookElement({row, col}: RookElementProps) {
  const {getBoardCell, displayAvailableMoves, clearMoves} = useBoard();
  const cell = getBoardCell(row, col);
  const board = Board.instance;
  const [tick, setTick] = useState(0);

  const onRookClick = () => {
    board.rookMoveDisplay.displayMoves(cell);
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
        <div className="figure" onClick={onRookClick}>
            <img src="src/images/figures/rook.png" alt=""/>
        </div>
    )
}

export default RookElement;