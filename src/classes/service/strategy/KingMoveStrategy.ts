import FigureMoveStrategy from "./FigureMoveStrategy.ts";
import {Cell} from "../../Cell.ts";

class KingMoveStrategy implements FigureMoveStrategy {
  public getAvailableCells(cell: Cell) : Cell[] {
    const availableCells = cell.figureOn?.checkAvailableCells();
    const figuresToCapture = cell.figureOn?.checkCaptures(availableCells);

    availableCells?.forEach((cell: Cell) => {
      figuresToCapture?.forEach(capture => {
        if (cell == capture) {
          console.log("suit")
          cell.canCapture = true;
        }
      })
    })

    if (availableCells) {
      return availableCells;
    }
    else {
      return [];
    }
  };
}

export default KingMoveStrategy;