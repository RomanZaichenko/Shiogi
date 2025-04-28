import {createContext, useEffect, useState} from "react";
import {Board, useBoard} from "../../classes/Board.ts";
import Figure from "../../classes/Figure.ts";


interface PawnElementProps {
  row: number;
  col: number;
  isCaptured: boolean;
  figure: Figure;
  owner: string;
}

function PawnElement({ row, col, isCaptured, figure, owner}: PawnElementProps) {
  const {getBoardCell, displayAvailableMoves, clearMoves} = useBoard();
  const board = Board.instance;
  let pawnImage: string;

  if(isCaptured) {
    pawnImage = "pawn.png";
    const onPawnClick = () => {
      if (owner === board.currentTurn) {
        board.selectCapturedFigure(figure);
        board.pawnMoveDisplay.displayDropIn(figure);
        const movesToDisplay = board.cellsToMoveDisplay; //change
        displayAvailableMoves(movesToDisplay);
      }
    }
    return (<div className="figure" onClick={onPawnClick}
                 draggable
                 onDragStart={onPawnClick}
                 onDragEnd={() => {
                   board.selectedCell = null;
                   clearMoves();
                   board.clearCapturesDisplay();
                 }}>

      <img src={`src/images/figures/${pawnImage}`} alt=""/>
    </div>)
  }
  else {
    const cell = getBoardCell(row, col);
    const [tick, setTick] = useState(0);

    const onPawnClick = () => {
      if ((board.currentTurn == "sente" && !cell.displayRotated) ||
        (board.currentTurn == "gote" && cell.displayRotated)) {

        if (!cell.canCapture){
          board.selectedCell = cell;
          board.pawnMoveDisplay.displayMoves(cell);
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
    }, [cell.figureOn]);


    if (isPromoted) {
      pawnImage = "pawn_promotion.png";
    }
    else {
      pawnImage = "pawn.png";
    }

    return (
      <div className="figure" onClick={onPawnClick}
           draggable
           onDragStart={onPawnClick}
           onDragEnd={() => {
             board.selectedCell = null;
             clearMoves();
             board.clearCapturesDisplay();
           }}>

        <img src={`src/images/figures/${pawnImage}`} alt=""/>
      </div>
    )
  }
}

export default PawnElement;