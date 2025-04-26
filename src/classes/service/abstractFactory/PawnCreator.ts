import FigureCreator from "./FigureCreator.ts";
import Figure from "../../Figure.ts";
import Pawn from "../../figures/Pawn.ts"
import Mediator from "../mediator/Mediator.ts";
import FigureState from "../state/FigureState.ts";

class PawnCreator implements FigureCreator{
    public createFigure(mediator: Mediator, row: number, col: number, state: FigureState): Figure {
        return new Pawn(mediator, row, col, state);
    }
}

export default PawnCreator;