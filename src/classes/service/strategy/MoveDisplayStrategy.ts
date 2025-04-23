import FigureMoveStrategy from "./FigureMoveStrategy.ts";
import {Cell} from "../../Cell.ts";
import {Board} from "../../Board.ts";

class MoveDisplayStrategy {
    private figureMoveStrategy: FigureMoveStrategy;

    constructor(strategy: FigureMoveStrategy) {
        this.figureMoveStrategy = strategy;
    }

    displayMoves(cell: Cell) {
        console.log(cell)
        console.log(this.figureMoveStrategy.getAvailableCells(cell))
        Board.instance.cellsToMoveDisplay =  this.figureMoveStrategy.getAvailableCells(cell);
        //this.figureMoveStrategy.displayCaptureCells();
    }
}

export default MoveDisplayStrategy;