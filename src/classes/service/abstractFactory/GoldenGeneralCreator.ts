import FigureCreator from "./FigureCreator.ts";
import Figure from "../../Figure.ts";
import GoldenGeneral from "../../figures/GoldenGeneral.ts"
import Mediator from "../mediator/Mediator.ts";

class GoldenGeneralCreator implements FigureCreator{
    public createFigure(mediator: Mediator, row: number, col: number): Figure {
        return new GoldenGeneral(mediator, row, col);
    }
}

export default GoldenGeneralCreator;