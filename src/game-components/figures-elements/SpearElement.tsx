import {Board, useBoard} from "../../classes/Board.ts";
import {useEffect, useState} from "react";
import Figure from "../../classes/Figure.ts";

interface SpearElementProps {
  row: number;
  col: number;
  isCaptured: boolean;
  figure: Figure;
  owner: string;
}

function SpearElement({row, col, isCaptured, figure, owner}: SpearElementProps) {
  const {getBoardCell, displayAvailableMoves, clearMoves} = useBoard();
  const board = Board.instance;
  let spearImage: string;

  if (isCaptured) {
    spearImage = "spear.png";
    const onSpearClick = () => {
      if (owner == board.currentTurn) {
        board.selectCapturedFigure(figure);
        board.spearMoveDisplay.displayDropIn(figure);
        const movesToDisplay = board.cellsToMoveDisplay; //change
        displayAvailableMoves(movesToDisplay);
      }
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
      if ((board.currentTurn == "sente" && !cell.displayRotated) ||
        (board.currentTurn == "gote" && cell.displayRotated)) {

        if (!cell.canCapture){
          board.selectedCell = cell;
          board.spearMoveDisplay.displayMoves(cell);
          const movesToDisplay = board.cellsToMoveDisplay;
          displayAvailableMoves(movesToDisplay);
        }
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