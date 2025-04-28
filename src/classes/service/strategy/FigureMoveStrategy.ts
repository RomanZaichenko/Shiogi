import {Cell} from "../../Cell.ts";
import Figure from "../../Figure.ts";

interface FigureMoveStrategy {
    getAvailableCells(cell: Cell): Cell[];
    getDropInCells(figure: Figure): Cell[];
}

export default FigureMoveStrategy;