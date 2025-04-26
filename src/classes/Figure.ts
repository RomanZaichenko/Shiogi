import {Cell} from "./Cell.ts";
import Mediator from "./service/mediator/Mediator.ts";
import {Board} from "./Board.ts";
import FigureState from "./service/state/FigureState.ts";

abstract class Figure {
    protected mediator: Mediator;
    protected figureCoordinates: {row: number, col: number};
    private state: FigureState;

    constructor(mediator: Mediator, row: number, col: number, state: FigureState) {
        this.mediator = mediator;
        this.figureCoordinates = {row, col};
        this.state = state;
        this.setFigureState(state);
    }


    move(cell: Cell): void {
        const board = Board.instance;
        const row = this.figureCoordinates.row;
        const col = this.figureCoordinates.col;
        const startMoveCell = board.coordinates[row][col]

        board.removeFigureFromCell(startMoveCell);
        board.displayFigureOrder(cell, this, startMoveCell.displayRotated);
        this.figureCoordinates.row = cell.coords.row;
        this.figureCoordinates.col = cell.coords.column;
    }

    abstract checkAvailableCells(): Cell[];

    requestForMove(cell: Cell) {
        this.mediator.getMoveOrder(this, cell);
    }

    getRow(): number {
        return this.figureCoordinates.row;
    }

    getCol(): number {
        return this.figureCoordinates.col;
    }

    public setFigureState(state: FigureState) {
        this.state = state;
        this.state.setFigure(this);
    }

    public getState(): FigureState {
        return this.state;
    }



}

export default Figure;