import Figure from "../../Figure.ts";
import {Cell} from "../../Cell.ts";

export default interface MoveImplementation {
  executeMove(figure: Figure, targetCell: Cell) : void;
}