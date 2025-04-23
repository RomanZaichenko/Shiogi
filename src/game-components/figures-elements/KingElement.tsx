import {useState, useEffect} from "react";
import {Board, useBoard} from "../../classes/Board.ts";

interface KingElementProps {
  row: number;
  col: number;
}

function KingElement({row, col}: KingElementProps) {
  const {getBoardCell, displayAvailableMoves, clearMoves} = useBoard();
  const cell = getBoardCell(row, col);
  const board = Board.instance;
  const [tick, setTick] = useState(0);

  const onKingClicked = () => {
    board.kingMoveDisplay.displayMoves(cell);
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
        <div className="figure" onClick={onKingClicked}>
            <img src="src/images/figures/king.png" alt=""/>
        </div>
    )
}

export default KingElement;