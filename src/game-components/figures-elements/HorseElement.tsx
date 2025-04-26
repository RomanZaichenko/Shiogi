import {Board, useBoard} from "../../classes/Board.ts";
import {useEffect, useState} from "react";


interface HorseElementProps {
  row: number;
  col: number;
}

function HorseElement({ row, col }: HorseElementProps) {
  const {getBoardCell, displayAvailableMoves, clearMoves} = useBoard();
  const cell = getBoardCell(row, col);
  const board = Board.instance;
  const [tick, setTick] = useState(0);
  let horseImage : string;

  const onHorseClick = () => {
    board.selectedCell = cell;
    board.horseMoveDisplay.displayMoves(cell);
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


  const [isPromoted, setIsPromoted] = useState(false);

  useEffect(() => {
    if (cell.figureOn?.getState().checkPromotion() != undefined) {
      setIsPromoted(cell.figureOn?.getState().checkPromotion())
    }
  }, [isPromoted]);


  if (isPromoted) {
    horseImage = "horse_promotion.png";
  }
  else {
    horseImage = "horse.png";
  }
    return (
        <div className="figure" onClick={onHorseClick}
        draggable
        onDragStart={onHorseClick}
        onDragEnd={() => {
          board.selectedCell = null;
          clearMoves();
        }}>
            <img src={`src/images/figures/${horseImage}`} alt=""/>
        </div>
    )
}

export default HorseElement;