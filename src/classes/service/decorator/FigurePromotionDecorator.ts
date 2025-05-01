import Figure from "../../Figure.ts";
import Mediator from "../mediator/Mediator.ts";
import FigureState from "../state/FigureState.ts";
import {Cell} from "../../Cell.ts";

class FigurePromotionDecorator extends Figure {
  protected figure: Figure;

  constructor(mediator: Mediator, row: number, col: number, state: FigureState, figure: Figure) {
    super(mediator, row, col, state);
    this.figure = figure;
  }

  checkAvailableCells(): Cell[] {
    return this.figure.checkAvailableCells();
  }

  checkCaptures(cells: Cell[]): Cell[] {
    return this.figure.checkCaptures(cells);
  }
}

export default FigurePromotionDecorator;