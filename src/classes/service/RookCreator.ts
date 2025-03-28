import FigureCreator from "./FigureCreator.ts";
import Figure from "../Figure.ts";
import Rook from "../figures/Rook.ts"

class RookCreator implements FigureCreator{
    public createFigure(): Figure {
        return new Rook();
    }
}

export default RookCreator;