import FigureMoveStrategy from "./FigureMoveStrategy.ts";
import {Cell} from "../../Cell.ts";
import Figure from "../../Figure.ts";

class SpearMoveStrategy implements FigureMoveStrategy {
  public getAvailableCells(cell: Cell) : Cell[] {
    const availableCells = cell.figureOn?.checkAvailableCells();
    const figuresToCapture = cell.figureOn?.checkCaptures(availableCells);

    availableCells?.forEach((cell: Cell) => {
      figuresToCapture?.forEach(capture => {
        if (cell == capture) {
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
  public getDropInCells(figure: Figure) {
    return  figure.checkAvailableCells();

  }
}

export default SpearMoveStrategy;