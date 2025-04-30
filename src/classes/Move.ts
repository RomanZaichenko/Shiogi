import {Cell} from "./Cell.ts";
import Figure from "./Figure.ts";

class Move {
  startCell: Cell;
  targetCell: Cell;
  figureToMove: Figure;

  constructor(figure: Figure, startCell: Cell, targetCell: Cell) {
    this.startCell = startCell;
    this.targetCell = targetCell;
    this.figureToMove = figure;
  }
}

export default Move;