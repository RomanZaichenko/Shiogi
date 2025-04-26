import {useEffect, useState} from "react";
import {Board, useBoard} from "../../classes/Board.ts";

interface ElephantElementProps {
  row: number;
  col: number;
}

function ElephantElement({row, col}: ElephantElementProps) {
  const {getBoardCell, displayAvailableMoves, clearMoves} = useBoard();
  const cell = getBoardCell(row, col);
  const board = Board.instance;
  const [tick, setTick] = useState(0);
  let elephantImage: string;

  const onElephantClick = () => {
    board.selectedCell = cell;
    board.elephantMoveDisplay.displayMoves(cell);
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
      }}>
          <img src={`src/images/figures/${elephantImage}`} alt=""/>
      </div>
  )
}

export default ElephantElement;