import FigureMoveStrategy from "./FigureMoveStrategy.ts";
import {Cell} from "../../Cell.ts";

class KingMoveStrategy implements FigureMoveStrategy {
  public getAvailableCells(cell: Cell) : Cell[] {
    const availableCells = cell.figureOn?.checkAvailableCells();

    if (availableCells) {
      return availableCells;
    }
    else {
      return [];
    }
  };
}

export default KingMoveStrategy;