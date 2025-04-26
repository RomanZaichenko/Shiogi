import FigureCreator from "./FigureCreator.ts";
import Figure from "../../Figure.ts";
import Rook from "../../figures/Rook.ts"
import Mediator from "../mediator/Mediator.ts";
import FigureState from "../state/FigureState.ts";

class RookCreator implements FigureCreator{
    public createFigure(mediator: Mediator, row: number, col: number, state: FigureState): Figure {
        return new Rook(mediator, row, col, state);
    }
}

export default RookCreator;