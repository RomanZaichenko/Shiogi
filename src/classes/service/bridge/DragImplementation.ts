import MoveImplementation from "./MoveImplementation.ts";
import Figure from "../../Figure.ts";
import {Cell} from "../../Cell.ts";

class DragImplementation implements MoveImplementation {
  public executeMove(figure: Figure, targetCell: Cell) : void {
    const availableCells = figure.checkAvailableCells();

    if (availableCells.includes(targetCell)) {
      figure.move(targetCell);
    }
  }
}

export default DragImplementation;