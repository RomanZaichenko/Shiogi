import FigureCreator from "./FigureCreator.ts";
import Figure from "../../Figure.ts";
import GoldenGeneral from "../../figures/GoldenGeneral.ts"
import Mediator from "../mediator/Mediator.ts";
import FigureState from "../state/FigureState.ts";

class GoldenGeneralCreator implements FigureCreator{
    public createFigure(mediator: Mediator, row: number, col: number, state: FigureState): Figure {
        return new GoldenGeneral(mediator, row, col, state);
    }
}

export default GoldenGeneralCreator;