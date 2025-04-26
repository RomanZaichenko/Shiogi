import Figure from "../Figure.ts";
import {Cell} from "../Cell.ts";
import {Board} from "../Board.ts";
import Mediator from "../service/mediator/Mediator.ts";
import FigureState from "../service/state/FigureState.ts";

class Pawn extends Figure{

    constructor(mediator: Mediator, row: number, col: number, state: FigureState) {
        super(mediator, row, col, state);
    }


    public checkAvailableCells(){
        const board = Board.instance;
        const row = this.figureCoordinates.row;
        const col = this.figureCoordinates.col;

        const startCell = board.getCell(row, col);
        let cellToCheck: Cell = board.getCell(row, col);
        const availableCells: Cell[] = [];

        if (row-1 >= 0) {
            cellToCheck = board.getCell(row-1, col);
        }


        if(!cellToCheck.isOccupied ||
            (cellToCheck.displayRotated != startCell.displayRotated)) {

            availableCells.push(cellToCheck);
        }

        return availableCells;
    }

    checkPromotion() :boolean {
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

export default Pawn;