import Mediator from "../service/mediator/Mediator.ts";
import {Cell} from "../Cell.ts";
import {Board} from "../Board.ts";
import Figure from "../Figure.ts";

class Horse extends Figure{
    constructor(mediator: Mediator, row: number, col: number) {
        super(mediator, row, col);
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

    checkPromotion() :boolean {
        if (this.figureCoordinates.row == 1) {
            return true;
        }
        if (this.figureCoordinates.row == 2 ) {
            const answer = confirm("Do you want to promote this pawn?");

            if (answer) {
                return true;
            }
        }

        return false;

    }
}

export default Horse;