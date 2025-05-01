import FigureMoveStrategy from "./FigureMoveStrategy.ts";
import {Cell} from "../../Cell.ts";
import Figure from "../../Figure.ts";

class KingMoveStrategy implements FigureMoveStrategy {
  public getAvailableCells(cell: Cell) : Cell[] {
    const availableCells = cell.figureOn?.checkAvailableCells();
    let figuresToCapture: Cell[] | undefined = [];

    if (availableCells) {
      figuresToCapture = cell.figureOn?.checkCaptures(availableCells);
    }

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

  getDropInCells(figure: Figure): Cell[] {
    figure.checkAvailableCells()
    return []
  }
}

export default KingMoveStrategy;