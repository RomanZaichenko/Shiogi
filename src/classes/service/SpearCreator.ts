import FigureCreator from "./FigureCreator.ts";
import Figure from "../Figure.ts";
import Spear from "../figures/Spear.ts"

class SpearCreator implements FigureCreator{
    public createFigure(): Figure {
        return new Spear();
    }
}

export default SpearCreator;