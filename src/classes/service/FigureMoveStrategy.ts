import {Cell} from "../Cell.ts";

interface FigureMoveStrategy {
    displayAvailableCells(cell: Cell): void;
}

export default FigureMoveStrategy;