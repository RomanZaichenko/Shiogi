import FigureCreator from "./FigureCreator.ts";
import Figure from "../Figure.ts";
import GoldenGeneral from "../figures/GoldenGeneral.ts"

class GoldenGeneralCreator implements FigureCreator{
    public createFigure(): Figure {
        return new GoldenGeneral();
    }
}

export default GoldenGeneralCreator;