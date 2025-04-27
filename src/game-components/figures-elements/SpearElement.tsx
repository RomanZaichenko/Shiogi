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
  let spearImage: string;

  const onSpearClick = () => {
    if (!cell.canCapture){
      board.selectedCell = cell;
      board.spearMoveDisplay.displayMoves(cell);
      const movesToDisplay = board.cellsToMoveDisplay;
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

  const [isPromoted, setIsPromoted] = useState(false);

  useEffect(() => {
    if (cell.figureOn?.getState().checkPromotion() != undefined) {
      setIsPromoted(cell.figureOn?.getState().checkPromotion())
    }
  }, [isPromoted]);


  if (isPromoted) {
    spearImage = "spear_promotion.png";
  }
  else {
    spearImage = "spear.png";
  }

    return (
        <div className="figure" onClick={onSpearClick}
        draggable
        onDragStart={onSpearClick}
        onDragEnd={() => {
          board.selectedCell = null;
          clearMoves();
          board.clearCapturesDisplay();
        }}>
            <img src={`src/images/figures/${spearImage}`} alt=""/>
        </div>
    )
}

export default SpearElement;