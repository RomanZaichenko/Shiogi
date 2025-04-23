import FigureCreator from "./FigureCreator.ts";
import Figure from "../../Figure.ts";
import Horse from "../../figures/Horse.ts"
import Mediator from "../mediator/Mediator.ts";

class HorseCreator implements FigureCreator{
    public createFigure(mediator: Mediator, row: number, col: number): Figure {
        return new Horse(mediator, row, col);
    }
}

export default HorseCreator;