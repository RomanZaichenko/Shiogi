import {Board, useBoard} from "../../classes/Board.ts";
import {useEffect, useState} from "react";


interface SilverGeneralElementProps {
  row: number;
  col: number;
}

function SilverGeneralElement({row, col}: SilverGeneralElementProps) {
  const {getBoardCell, displayAvailableMoves, clearMoves} = useBoard();
  const cell = getBoardCell(row, col);
  const board = Board.instance;
  const [tick, setTick] = useState(0);

  const onSilverGeneralClick = () => {
    console.log("g general");
    board.silverGeneralMoveDisplay.displayMoves(cell);
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
        <div className="figure" onClick={onSilverGeneralClick}>
            <img src="src/images/figures/silver_general.png" alt=""/>
        </div>
    )
}

export default SilverGeneralElement;