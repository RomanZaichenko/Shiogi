import FigureCreator from "./FigureCreator.ts";
import Figure from "../Figure.ts";
import King from "../figures/King.ts"

class KingCreator implements FigureCreator{
    public createFigure(): Figure {
        return new King();
    }
}

export default KingCreator;