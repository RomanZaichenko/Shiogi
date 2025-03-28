import FigureCreator from "./FigureCreator.ts";
import Figure from "../Figure.ts";
import Elephant from "../figures/Elephant.ts"

class ElephantCreator implements FigureCreator{
    public createFigure(): Figure {
        return new Elephant();
    }
}

export default ElephantCreator;