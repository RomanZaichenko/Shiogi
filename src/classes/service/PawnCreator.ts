import FigureCreator from "./FigureCreator.ts";
import Figure from "../Figure.ts";
import Pawn from "../figures/Pawn.ts"
import Mediator from "./Mediator.ts";

class PawnCreator implements FigureCreator{
    public createFigure(mediator: Mediator, x: number, y: number): Figure {
        return new Pawn(mediator, x, y);
    }
}

export default PawnCreator;