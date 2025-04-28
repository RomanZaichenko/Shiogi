import {useEffect, useState} from "react";
import {Board, useBoard} from "../../classes/Board.ts";
import BoardProvider from "../BoardProvider.tsx";

interface ElephantElementProps {
  row: number;
  col: number;
  isCaptured: boolean;
}

function ElephantElement({row, col, isCaptured}: ElephantElementProps) {
  const {getBoardCell, displayAvailableMoves, clearMoves} = useBoard();
  const board = Board.instance;
  let elephantImage: string;

  if(isCaptured) {
    elephantImage = "elephant.png";
    const onElephantClick = () => {

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
      if(!cell.canCapture){

        board.selectedCell = cell;
        board.elephantMoveDisplay.displayMoves(cell);
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