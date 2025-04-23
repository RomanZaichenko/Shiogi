import FigureCreator from "./FigureCreator.ts";
import Figure from "../../Figure.ts";
import Pawn from "../../figures/Pawn.ts"
import Mediator from "../mediator/Mediator.ts";

class PawnCreator implements FigureCreator{
    public createFigure(mediator: Mediator, row: number, col: number): Figure {
        return new Pawn(mediator, row, col);
    }
}

export default PawnCreator;