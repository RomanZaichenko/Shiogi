import {useEffect, useState} from "react";
import {Board, useBoard} from "../../classes/Board.ts";
import BoardProvider from "../BoardProvider.tsx";
import Figure from "../../classes/Figure.ts";

interface ElephantElementProps {
  row: number;
  col: number;
  isCaptured: boolean;
  figure: Figure;
  owner: string;
}

function ElephantElement({row, col, isCaptured, figure, owner}: ElephantElementProps) {
  const {getBoardCell, displayAvailableMoves, clearMoves} = useBoard();
  const board = Board.instance;
  let elephantImage: string;

  if(isCaptured) {
    elephantImage = "elephant.png";
    const onElephantClick = () => {
      if (board.currentTurn == owner)
      {
        board.figureToDrop = figure;
        board.elephantMoveDisplay.displayDropIn(figure);
        const movesToDisplay = board.cellsToMoveDisplay; //change
        displayAvailableMoves(movesToDisplay);
      }
    }
    return (<div className="figure" onClick={onElephantClick}
                 draggable
                 onDragStart={onElephantClick}
                 onDragEnd={() => {
                   board.selectedCell = null;
                   clearMoves();
                   board.clearCapturesDisplay();
                 }}>

      <img src={`src/images/figures/${elephantImage}`} alt=""/>
    </div>)
  }
  else{
    const cell = getBoardCell(row, col);
    const [tick, setTick] = useState(0);

    const onElephantClick = () => {
      if (board.currentTurn == "sente" && !cell.displayRotated){
        if(!cell.canCapture){

          board.selectedCell = cell;
          board.elephantMoveDisplay.displayMoves(cell);
          const movesToDisplay = board.cellsToMoveDisplay;
          displayAvailableMoves(movesToDisplay);
        }
      }
      else if (board.currentTurn == "gote" && cell.displayRotated){
        if(!cell.canCapture){

          board.selectedCell = cell;
          board.elephantMoveDisplay.displayMoves(cell);
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
      elephantImage = "elephant_promotion.png";
    }
    else {
      elephantImage = "elephant.png";
    }

    return (
      <div className="figure" onClick={onElephantClick}
           draggable
           onDragStart = {onElephantClick}
           onDragEnd = {() => {
             board.selectedCell = null;
             clearMoves();
             board.clearCapturesDisplay();
           }}>
        <img src={`src/images/figures/${elephantImage}`} alt=""/>
      </div>
    )
  }
}

export default ElephantElement;