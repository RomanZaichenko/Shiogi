import FigureMoveStrategy from "./FigureMoveStrategy.ts";
import {Cell} from "../../Cell.ts";
import {Board} from "../../Board.ts";
import Figure from "../../Figure.ts";

class MoveDisplayStrategy {
    private figureMoveStrategy: FigureMoveStrategy;

    constructor(strategy: FigureMoveStrategy) {
        this.figureMoveStrategy = strategy;
    }

    displayMoves(cell: Cell) {
        Board.instance.cellsToMoveDisplay =  this.figureMoveStrategy.getAvailableCells(cell);
    }

    displayDropIn(figure: Figure) {
        Board.instance.cellsToMoveDisplay = this.figureMoveStrategy.getDropInCells(figure);
    }
}

export default MoveDisplayStrategy;