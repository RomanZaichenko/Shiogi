import FigureCreator from "./FigureCreator.ts";
import Figure from "../../Figure.ts";
import King from "../../figures/King.ts"
import Mediator from "../mediator/Mediator.ts";

class KingCreator implements FigureCreator{
    public createFigure(mediator: Mediator, row: number, col: number): Figure {
        return new King(mediator, row, col);
    }
}

export default KingCreator;