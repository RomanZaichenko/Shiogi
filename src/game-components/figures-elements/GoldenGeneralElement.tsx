import {useEffect, useState} from "react";
import {Board, useBoard} from "../../classes/Board.ts";
import Figure from "../../classes/Figure.ts";

interface GoldenGeneralElementProps {
  row: number;
  col: number;
  isCaptured: boolean;
  figure: Figure;
  owner: string;
}

function GoldenGeneralElement({row, col, isCaptured, figure, owner}: GoldenGeneralElementProps){
  const {getBoardCell, displayAvailableMoves, clearMoves} = useBoard();
  const board = Board.instance;

  if(isCaptured){
    const onGoldenGeneralClick = () => {
      if (owner === board.currentTurn) {
        board.selectCapturedFigure(figure);
        board.goldenGeneralMoveDisplay.displayDropIn(figure);
        const movesToDisplay = board.cellsToMoveDisplay;
        displayAvailableMoves(movesToDisplay);
      }
    }
    return (<div className="figure" onClick={onGoldenGeneralClick}
                 draggable
                 onDragStart={onGoldenGeneralClick}
                 onDragEnd={() => {
                   board.selectedCell = null;
                   clearMoves();
                   board.clearCapturesDisplay();
                 }}>

      <img src={`src/images/figures/golden_general.png`} alt=""/>
    </div>)
  }
  else{
    const cell = getBoardCell(row, col);
    const [tick, setTick] = useState(0);

    const onGoldenGeneralClick = () => {
      if ((board.currentTurn == "sente" && !cell.displayRotated) ||
        (board.currentTurn == "gote" && cell.displayRotated)) {
        if (!cell.canCapture) {
          board.selectedCell = cell;

          board.goldenGeneralMoveDisplay.displayMoves(cell);
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
    return (
      <div className="figure" onClick={onGoldenGeneralClick}
           draggable
           onDragStart={onGoldenGeneralClick}
           onDragEnd={() => {
             board.selectedCell = null;
             clearMoves();
             board.clearCapturesDisplay();
           }}>
        <img src="src/images/figures/golden_general.png" alt=""/>
      </div>
    )
  }
}

export default GoldenGeneralElement;