import FigureCreator from "./FigureCreator.ts";
import Figure from "../../Figure.ts";
import Spear from "../../figures/Spear.ts"
import Mediator from "../mediator/Mediator.ts";
import FigureState from "../state/FigureState.ts";

class SpearCreator implements FigureCreator{
    public createFigure(mediator: Mediator, row: number, col: number, state: FigureState): Figure {
        return new Spear(mediator, row, col, state);
    }
}

export default SpearCreator;