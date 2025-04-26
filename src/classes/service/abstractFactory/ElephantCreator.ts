import FigureCreator from "./FigureCreator.ts";
import Figure from "../../Figure.ts";
import Elephant from "../../figures/Elephant.ts"
import Mediator from "../mediator/Mediator.ts";
import FigureState from "../state/FigureState.ts";

class ElephantCreator implements FigureCreator{
    public createFigure(mediator: Mediator, row: number, col: number, state: FigureState): Figure {
        return new Elephant(mediator, row, col, state);
    }
}

export default ElephantCreator;