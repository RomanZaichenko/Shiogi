import {Board, useBoard} from "../../classes/Board.ts";
import {useEffect, useState} from "react";
import Figure from "../../classes/Figure.ts";

interface SilverGeneralElementProps {
  row: number;
  col: number;
  isCaptured: boolean;
  figure: Figure;
  owner: string;
}

function SilverGeneralElement({row, col, isCaptured, figure, owner}: SilverGeneralElementProps) {
  const {getBoardCell, displayAvailableMoves, clearMoves} = useBoard();
  const board = Board.instance;
  let silverGeneralImage: string;


  if (isCaptured) {
    silverGeneralImage = "silver_general.png";
    const onSilverGeneralClick = () => {
      if (owner == board.currentTurn) {
        board.selectCapturedFigure(figure);
        board.silverGeneralMoveDisplay.displayDropIn(figure);
        const movesToDisplay = board.cellsToMoveDisplay; //change
        displayAvailableMoves(movesToDisplay);
      }
    }
    return (<div className="figure" onClick={onSilverGeneralClick}
                 draggable
                 onDragStart={onSilverGeneralClick}
                 onDragEnd={() => {
                   board.selectedCell = null;
                   clearMoves();
                   board.clearCapturesDisplay();
                 }}>

      <img src={`src/images/figures/${silverGeneralImage}`} alt=""/>
    </div>)
  }
  else {
    const cell = getBoardCell(row, col);
    const [tick, setTick] = useState(0);

    const onSilverGeneralClick = () => {
      if ((board.currentTurn == "sente" && !cell.displayRotated) ||
        (board.currentTurn == "gote" && cell.displayRotated)) {

        if(!cell.canCapture){

          board.selectedCell = cell;
          board.silverGeneralMoveDisplay.displayMoves(cell);
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
      silverGeneralImage = "silver_general-promotion.png";
    }
    else {
      silverGeneralImage = "silver_general.png";
    }
    return (
      <div className="figure" onClick={onSilverGeneralClick}
           draggable
           onDragStart={onSilverGeneralClick}
           onDragEnd={() => {
             board.selectedCell = null;
             clearMoves();
             board.clearCapturesDisplay();
           }}>
        <img src={`src/images/figures/${silverGeneralImage}`} alt=""/>
      </div>
    )
  }
}

export default SilverGeneralElement;