import FigureMoveStrategy from "./FigureMoveStrategy.ts";
import {Cell} from "../../Cell.ts";

class PawnMoveStrategy implements FigureMoveStrategy {


    public getAvailableCells(cell: Cell) : Cell[] {
        console.log()
        const availableCells = cell.figureOn?.checkAvailableCells();

        if (availableCells) {
            return availableCells;
        }
        else {
            return [];
        }
    };
}

export default PawnMoveStrategy;