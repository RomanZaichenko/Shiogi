import Figure from "../Figure.ts";
import Mediator from "../service/mediator/Mediator.ts";
import {Board} from "../Board.ts";
import {Cell} from "../Cell.ts";


class King extends Figure {
    public isChecked: boolean = false;

    constructor(mediator: Mediator, row: number, col: number) {
        super(mediator, row, col)
    }

    public checkAvailableCells(){
        const board = Board.instance;
        const row = this.figureCoordinates.row;
        const col = this.figureCoordinates.col;

        const startCell = board.getCell(row, col);
        let cellToCheck: Cell;
        const availableCells: Cell[] = [];


        if (row-1 >= 0){
            for(let i = col-1; i <= col+1; i++) {
                if ((i == col-1 && i < 0) || (i == col+1 && i > 8)){
                    continue;
                }


                cellToCheck = board.getCell(row-1, i);

                if(!cellToCheck.isOccupied ||
                  (cellToCheck.displayRotated != startCell.displayRotated)) {
                    availableCells.push(cellToCheck);
                }
            }
        }


        for(let i = col-1; i <= col+1; i++) {
            if ((i == col-1 && i < 0) || (i == col+1 && i > 8)){
                continue;
            }
            cellToCheck = board.getCell(row, i);

            if(!cellToCheck.isOccupied ||
              (cellToCheck.displayRotated != startCell.displayRotated)) {
                availableCells.push(cellToCheck);
            }
        }

        if (row+1 <= 8){
            for (let i = col-1; i <= col+1; i++) {
                if ((i == col-1 && i < 0) || (i == col+1 && i > 8)){
                    continue;
                }

                cellToCheck = board.getCell(row+1, i);

                if(!cellToCheck.isOccupied ||
                  (cellToCheck.displayRotated != startCell.displayRotated)) {
                    availableCells.push(cellToCheck);
                }
            }
        }


        return availableCells;
    }
}

export default King;