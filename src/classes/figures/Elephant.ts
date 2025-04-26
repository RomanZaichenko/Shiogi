import Mediator from "../service/mediator/Mediator.ts";
import {Cell} from "../Cell.ts";
import {Board} from "../Board.ts";
import Figure from "../Figure.ts";
import FigureState from "../service/state/FigureState.ts";


class Elephant extends Figure {

    constructor(mediator: Mediator, row: number, col: number, state: FigureState) {
        super(mediator, row, col, state);
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
}

export default Elephant;