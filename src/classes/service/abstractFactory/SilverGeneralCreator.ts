import FigureCreator from "./FigureCreator.ts";
import Figure from "../../Figure.ts";
import SilverGeneral from "../../figures/SilverGeneral.ts"
import Mediator from "../mediator/Mediator.ts";

class SilverGeneralCreator implements FigureCreator{
    public createFigure(mediator: Mediator, row: number, col: number): Figure {
        return new SilverGeneral(mediator, row, col);
    }
}

export default SilverGeneralCreator;