import {Board, useBoard} from "../../classes/Board.ts";
import {useEffect, useState} from "react";


interface SilverGeneralElementProps {
  row: number;
  col: number;
}

function SilverGeneralElement({row, col}: SilverGeneralElementProps) {
  const {getBoardCell, displayAvailableMoves, clearMoves} = useBoard();
  const cell = getBoardCell(row, col);
  const board = Board.instance;
  const [tick, setTick] = useState(0);
  let silverGeneralImage: string;

  const onSilverGeneralClick = () => {
    if(!cell.canCapture){

    board.selectedCell = cell;
    console.log("g general");
    board.silverGeneralMoveDisplay.displayMoves(cell);
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

export default SilverGeneralElement;