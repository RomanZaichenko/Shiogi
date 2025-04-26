import FigureCreator from "./FigureCreator.ts";
import Figure from "../../Figure.ts";
import Horse from "../../figures/Horse.ts"
import Mediator from "../mediator/Mediator.ts";
import FigureState from "../state/FigureState.ts";

class HorseCreator implements FigureCreator{
    public createFigure(mediator: Mediator, row: number, col: number, state: FigureState): Figure {
        return new Horse(mediator, row, col,state);
    }
}

export default HorseCreator;