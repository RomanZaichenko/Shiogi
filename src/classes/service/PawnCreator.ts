import FigureCreator from "./FigureCreator.ts";
import Figure from "../Figure.ts";
import Pawn from "../figures/Pawn.ts"

class PawnCreator implements FigureCreator{
    public createFigure(): Figure {
        return new Pawn();
    }
}

export default PawnCreator;