import FigureCreator from "./FigureCreator.ts";
import Figure from "../../Figure.ts";
import Rook from "../../figures/Rook.ts"
import Mediator from "../mediator/Mediator.ts";

class RookCreator implements FigureCreator{
    public createFigure(mediator: Mediator, row: number, col: number): Figure {
        return new Rook(mediator, row, col);
    }
}

export default RookCreator;