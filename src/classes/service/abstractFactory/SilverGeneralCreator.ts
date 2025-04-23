import FigureCreator from "./FigureCreator.ts";
import Figure from "../../Figure.ts";
import SilverGeneral from "../../figures/SilverGeneral.ts"

class SilverGeneralCreator implements FigureCreator{
    public createFigure(): Figure {
        return new SilverGeneral();
    }
}

export default SilverGeneralCreator;