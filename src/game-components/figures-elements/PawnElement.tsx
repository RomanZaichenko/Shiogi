import {createContext, useEffect, useState} from "react";
import {Board, useBoard} from "../../classes/Board.ts";


interface PawnElementProps {
  row: number;
  col: number;
}

function PawnElement({ row, col }: PawnElementProps) {
  const {getBoardCell, displayAvailableMoves, clearMoves} = useBoard();
  const cell = getBoardCell(row, col);
  const board = Board.instance;
  const [tick, setTick] = useState(0);
  let pawnImage: string;

  const onPawnClick = () => {
    if (!cell.canCapture){
      board.selectedCell = cell;
      console.log(cell);
      board.pawnMoveDisplay.displayMoves(cell);
      const movesToDisplay = board.cellsToMoveDisplay;
      console.log(movesToDisplay);
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

export default PawnElement;