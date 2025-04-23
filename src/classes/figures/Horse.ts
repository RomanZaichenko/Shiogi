import Mediator from "../service/mediator/Mediator.ts";
import {Cell} from "../Cell.ts";
import {Board} from "../Board.ts";

class Horse {
    figureCoordinates: {row: number; col: number};
    mediator: Mediator;

    constructor(mediator: Mediator, row: number, col: number) {
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
        this.figureCoordinates.row = cell.coords.row;
        this.figureCoordinates.col = cell.coords.column;
    }

    public checkAvailableCells(){
        const board = Board.instance;
        console.log(this.figureCoordinates);
        const row = this.figureCoordinates.row;
        const col = this.figureCoordinates.col;

        const startCell = board.getCell(row, col);
        let cellToCheck: Cell;
        const availableCells: Cell[] = [];

        if (row - 2 >= 0){
            if (col-1 >= 0){
                cellToCheck = board.getCell(row-2, col-1);

                if(!cellToCheck.isOccupied ||
                  (cellToCheck.displayRotated != startCell.displayRotated)) {
                    availableCells.push(cellToCheck);
                }
            }

            if (col+1 <= 8){
                cellToCheck = board.getCell(row-2, col+1);
                if(!cellToCheck.isOccupied ||
                  (cellToCheck.displayRotated != startCell.displayRotated)) {
                    availableCells.push(cellToCheck);
                }
            }

        }
        return availableCells;
    }

    requestForMove(cell: Cell) {
        this.mediator.getMoveOrder(this, cell);
    }
}

export default Horse;