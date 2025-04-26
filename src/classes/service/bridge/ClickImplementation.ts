import MoveImplementation from "./MoveImplementation.ts";
import Figure from "../../Figure.ts";
import {Cell} from "../../Cell.ts";

class ClickImplementation implements MoveImplementation {
  public executeMove(figure: Figure, targetCell: Cell) : void {
    console.log("clicking");

    const availableCells = figure.checkAvailableCells();

    if (availableCells.includes(targetCell)) {
      figure.move(targetCell);
    }
  }
}

export default ClickImplementation;