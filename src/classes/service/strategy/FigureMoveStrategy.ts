import {Cell} from "../../Cell.ts";

interface FigureMoveStrategy {
    getAvailableCells(cell: Cell): Cell[];
}

export default FigureMoveStrategy;