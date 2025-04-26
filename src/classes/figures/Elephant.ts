import Mediator from "../service/mediator/Mediator.ts";
import {Cell} from "../Cell.ts";
import {Board} from "../Board.ts";


class Elephant {
    figureCoordinates: {row: number; col: number};
    mediator: Mediator;
    isPromoted: boolean = false;

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

        if (this.checkPromotion() && !this.isPromoted) {
            this.isPromoted = true;
        }
    }

    public checkAvailableCells(){
        const board = Board.instance;
        console.log(this.figureCoordinates);
        const row = this.figureCoordinates.row;
        const col = this.figureCoordinates.col;

        const startCell = board.getCell(row, col);
        let cellToCheck: Cell;
        const availableCells: Cell[] = [];


        if (row - 1 >= 0 && col - 1 >= 0) {
            let rowCount = row;
            let colCount = col;
            do {
                cellToCheck = board.getCell(rowCount-1, colCount-1);
                console.log(`${rowCount} ${colCount}`);
                console.log("cellToCheck");
                console.log(cellToCheck);
                if(!cellToCheck.isOccupied ||
                  (cellToCheck.displayRotated != startCell.displayRotated)) {
                    availableCells.push(cellToCheck);
                    if (cellToCheck.isOccupied) {
                        break;
                    }
                }
                else {
                    break;
                }
                rowCount--;
                colCount--;
            }
            while (rowCount - 1 >= 0 && colCount - 1 >= 0);
        }

        if (row - 1 >= 0 && col + 1 <= 8) {
            let rowCount = row;
            let colCount = col;
            do {
                cellToCheck = board.getCell(rowCount-1, colCount+1);
                if((cellToCheck.displayRotated != startCell.displayRotated) ||
                  !cellToCheck.isOccupied ) {
                    availableCells.push(cellToCheck);

                    if (cellToCheck.isOccupied) {
                        break;
                    }
                }
                else{
                    break;
                }
                rowCount--;
                colCount++;
            }
            while ((rowCount - 1 >= 0 && colCount + 1 <= 8));
        }

        if (row + 1 <= 8 && col - 1 >= 0) {
            let rowCount = row;
            let colCount = col;
            do {
                cellToCheck = board.getCell(rowCount+1, colCount-1);
                if((cellToCheck.displayRotated != startCell.displayRotated) ||
                  !cellToCheck.isOccupied ) {
                    availableCells.push(cellToCheck);

                    if (cellToCheck.isOccupied) {
                        break;
                    }
                }
                else {
                    break;
                }
                rowCount++;
                colCount--;
            }
            while ((rowCount + 1 <= 8 && colCount - 1 >= 0));
        }

        if (row + 1 <= 8 && col + 1 <= 8) {
            let rowCount = row;
            let colCount = col;
            do {
                cellToCheck = board.getCell(rowCount+1, colCount+1);
                if((cellToCheck.displayRotated != startCell.displayRotated) ||
                  !cellToCheck.isOccupied ) {
                    availableCells.push(cellToCheck);

                    if (cellToCheck.isOccupied) {
                        break;
                    }
                }
                else {
                    break;
                }
                rowCount++;
                colCount++;
            }
            while ((rowCount + 1 <= 8 && colCount + 1 <= 8));
        }

        return availableCells;
    }

    checkPromotion() {
        if (this.figureCoordinates.row <= 2) {
            const answer = confirm("Do you want to promote this pawn?");

            if (answer) {
                return true;
            }
        }
        return false;
    }

    requestForMove(cell: Cell) {
        this.mediator.getMoveOrder(this, cell);
    }
}

export default Elephant;