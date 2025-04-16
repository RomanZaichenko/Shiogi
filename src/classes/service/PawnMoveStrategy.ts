import FigureMoveStrategy from "./FigureMoveStrategy.ts";
import {Cell} from "../Cell.ts";

class PawnMoveStrategy implements FigureMoveStrategy {
    public displayAvailableCells(cell: Cell) {
        const availableCells = cell.figureOn?.checkAvailableCells();

        availableCells.forEach((cell: Cell) => {
            cell.canMoveTo = true;
        })
    };
}