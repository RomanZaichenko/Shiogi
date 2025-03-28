import FigureCreator from "./FigureCreator.ts";
import Figure from "../Figure.ts";
import Horse from "../figures/Horse.ts"

class HorseCreator implements FigureCreator{
    public createFigure(): Figure {
        return new Horse();
    }
}

export default HorseCreator;