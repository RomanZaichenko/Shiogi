import Mediator from "../service/mediator/Mediator.ts";
import {Cell} from "../Cell.ts";
import {Board} from "../Board.ts";
import Figure from "../Figure.ts";


class Spear extends Figure{

    constructor(mediator: Mediator, row: number, col: number) {
        super(mediator, row, col)
    }


    public checkAvailableCells(){
        const board = Board.instance;
        console.log(this.figureCoordinates);
        let row = this.figureCoordinates.row;
        const col = this.figureCoordinates.col;

        const startCell = board.getCell(row, col);
        let cellToCheck: Cell;
        const availableCells: Cell[] = [];


        if (row - 1 >= 0) {
            do {
                cellToCheck = board.getCell(row-1, col);
                if(!cellToCheck.isOccupied ||
                  (cellToCheck.displayRotated != startCell.displayRotated)) {
                    availableCells.push(cellToCheck);

                    if (cellToCheck.isOccupied) {
                        break;
                    }
                }else {
                    break;
                }

                row--;
            }
            while (!cellToCheck.isOccupied);
        }
        return availableCells;
    }

    checkPromotion() :boolean{
        if (this.figureCoordinates.row == 0) {
            return true;
        }
        if (this.figureCoordinates.row == 1 || this.figureCoordinates.row == 2 ) {
            const answer = confirm("Do you want to promote this pawn?");

            if (answer) {
                return true;
            }
        }

        return false;

    }
}

export default Spear;