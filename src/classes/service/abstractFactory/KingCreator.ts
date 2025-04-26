import FigureCreator from "./FigureCreator.ts";
import Figure from "../../Figure.ts";
import King from "../../figures/King.ts"
import Mediator from "../mediator/Mediator.ts";
import FigureState from "../state/FigureState.ts";

class KingCreator implements FigureCreator{
    public createFigure(mediator: Mediator, row: number, col: number, state: FigureState): Figure {
        return new King(mediator, row, col, state);
    }
}

export default KingCreator;