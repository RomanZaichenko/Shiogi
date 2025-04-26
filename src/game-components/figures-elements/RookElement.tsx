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
  let rookImage: string;

  const onRookClick = () => {
    board.selectedCell = cell;
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

  const [isPromoted, setIsPromoted] = useState(false);

  useEffect(() => {
    if (cell.figureOn?.getState().checkPromotion() != undefined) {
      setIsPromoted(cell.figureOn?.getState().checkPromotion())
    }
  }, [isPromoted]);


  if (isPromoted) {
    rookImage = "rook_promotion.png";
  }
  else {
    rookImage = "rook.png";
  }

    return (
        <div className="figure" onClick={onRookClick}
        draggable
        onDragStart={onRookClick}
        onDragEnd={() => {
          board.selectedCell = null;
          clearMoves();
        }}>
            <img src={`src/images/figures/${rookImage}`} alt=""/>
        </div>
    )
}

export default RookElement;