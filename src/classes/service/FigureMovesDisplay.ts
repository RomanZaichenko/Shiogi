import FigureMoveStrategy from "./FigureMoveStrategy.ts";
import {Cell} from "../Cell.ts";

class MoveDisplayStrategy {
    private figureMoveStrategy: FigureMoveStrategy;

    constructor(strategy: FigureMoveStrategy) {
        this.figureMoveStrategy = strategy;
    }

    displayMoves(cell: Cell) {
        this.figureMoveStrategy.displayAvailableCells(cell);
        //this.figureMoveStrategy.displayCaptureCells();
    }
}