import FigureCreator from "./FigureCreator.ts";
import Figure from "../../Figure.ts";
import SilverGeneral from "../../figures/SilverGeneral.ts"
import Mediator from "../mediator/Mediator.ts";
import FigureState from "../state/FigureState.ts";

class SilverGeneralCreator implements FigureCreator{
    public createFigure(mediator: Mediator, row: number, col: number, state: FigureState): Figure {
        return new SilverGeneral(mediator, row, col, state);
    }
}

export default SilverGeneralCreator;