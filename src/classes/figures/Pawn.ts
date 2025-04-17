import Figure from "../Figure.ts";
import {Cell} from "../Cell.ts";
import {Board} from "../Board.ts";
import Mediator from "../service/Mediator.ts";

class Pawn implements Figure{
    figureCoordinates: {row: number, col: number};
    mediator: Mediator;


    constructor(mediator: Mediator, row: number, col: number ) {
        this.mediator = mediator;
        this.figureCoordinates = {row, col};
    }


    public move(cell: Cell) {
        const board = Board.instance;
        const row = this.figureCoordinates.row;
        const col = this.figureCoordinates.col;
        const startMoveCell = board.coordinates[row][col]

        board.removeFigureFromCell(startMoveCell);
        board.displayFigureOrder(cell, this, startMoveCell.displayRotated);
    }


    public checkAvailableCells(){
        const row = this.figureCoordinates.row;
        const col = this.figureCoordinates.col;

        const coords = Board.instance.coordinates;
        const startCell = coords[row][col];
        const cellToCheck: Cell = coords[row-1][col];
        const availableCells: Cell[] = [];


        if(!cellToCheck.isOccupied ||
            (cellToCheck.displayRotated != startCell.displayRotated)) {
            availableCells.push(cellToCheck);
        }

        return availableCells;
    }

    requestForMove(cell: Cell) {
        this.mediator.getMoveOrder(this, cell);
    }
}

export default Pawn;