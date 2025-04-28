import Mediator from "../service/mediator/Mediator.ts";
import {Cell} from "../Cell.ts";
import {Board} from "../Board.ts";
import Figure from "../Figure.ts";
import FigureState from "../service/state/FigureState.ts";
import PromotionState from "../service/state/PromotionState.ts";
import RookPromotionDecorator from "../service/decorator/RookPromotionDecorator.ts";

class Rook extends Figure{

    constructor(mediator: Mediator, row: number, col: number, state: FigureState) {
        super(mediator, row, col, state);
    }

    move(cell: Cell) {
        super.move(cell);

        if(this.checkPromotion()) {
            cell.figureOn  = new RookPromotionDecorator(
              this.mediator,
              this.figureCoordinates.row,
              this.figureCoordinates.col,
              new PromotionState(),
              this
            );
        }

    }

    public checkAvailableCells(){
        const board = Board.instance;
        const row = this.figureCoordinates.row;
        const col = this.figureCoordinates.col;

        const startCell = board.getCell(row, col);
        let cellToCheck: Cell;
        const availableCells: Cell[] = [];


        if (row - 1 >= 0) {
            let rowCount = row;
            do {
                cellToCheck = board.getCell(rowCount-1, col);
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
                rowCount--;
            }
            while (rowCount - 1 >= 0);
        }

        if (row + 1 <= 8) {
            let rowCount = row;

            do {
                cellToCheck = board.getCell(rowCount+1, col);
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
                rowCount++;
            }
            while (rowCount + 1 <= 8);
        }

        if (col - 1 >= 0) {

            let colCount = col;
            do {
                cellToCheck = board.getCell(row, colCount-1);
                if((cellToCheck.displayRotated != startCell.displayRotated) ||
                  !cellToCheck.isOccupied ) {
                    availableCells.push(cellToCheck);

                    if (cellToCheck.isOccupied) {
                        break;
                    }
                }
                else {break;}

                colCount--;
            }
            while (colCount - 1 >= 0);
        }

        if (col + 1 <= 8) {
            let colCount = col;
            do {
                cellToCheck = board.getCell(row, colCount+1);
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

                colCount++;
            }
            while (colCount + 1 <= 8);
        }

        return availableCells;
    }

    checkPromotion() {
        if (this.figureCoordinates.row <= 2) {
            const answer = confirm("Do you want to promote this rook?");

            if (answer) {
                return true;
            }
        }
        return false;
    }

    public checkCaptures(cells: Cell[]) :Cell[] {
        const board = Board.instance;
        const startCell = board.getCell(this.getRow(), this.getCol());
        const cellsToCapture :Cell[] = [];
        cells.forEach((cell: Cell) => {
            if(cell.displayRotated != startCell.displayRotated){
                cellsToCapture.push(cell);
            }
        })



        return cellsToCapture;
    }

}

export default Rook;