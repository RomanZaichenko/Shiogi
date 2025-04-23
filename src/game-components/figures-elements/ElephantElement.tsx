import {useEffect, useState} from "react";
import {Board, useBoard} from "../../classes/Board.ts";

interface ElephantElementProps {
  row: number;
  col: number;
}

function ElephantElement({row, col}: ElephantElementProps) {
  const {getBoardCell, displayAvailableMoves, clearMoves} = useBoard();
  const cell = getBoardCell(row, col);
  const board = Board.instance;
  const [tick, setTick] = useState(0);

  const onElephantClick = () => {
    board.elephantMoveDisplay.displayMoves(cell);
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
        <div className="figure" onClick={onElephantClick}>
            <img src="src/images/figures/elephant.png" alt=""/>
        </div>
    )
}

export default ElephantElement;