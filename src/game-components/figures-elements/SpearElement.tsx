import {Board, useBoard} from "../../classes/Board.ts";
import {useEffect, useState} from "react";

interface SpearElementProps {
  row: number;
  col: number;
  isCaptured: boolean;
}

function SpearElement({row, col, isCaptured}: SpearElementProps) {
  const {getBoardCell, displayAvailableMoves, clearMoves} = useBoard();
  const board = Board.instance;
  let spearImage: string;

  if (isCaptured) {
    spearImage = "spear.png";
    const onSpearClick = () => {

    }
    return (<div className="figure" onClick={onSpearClick}
                 draggable
                 onDragStart={onSpearClick}
                 onDragEnd={() => {
                   board.selectedCell = null;
                   clearMoves();
                   board.clearCapturesDisplay();
                 }}>

      <img src={`src/images/figures/${spearImage}`} alt=""/>
    </div>)
  }
  else{
    const cell = getBoardCell(row, col);
    const [tick, setTick] = useState(0);

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
}

export default SpearElement;