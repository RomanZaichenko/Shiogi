import Figure from "../Figure.ts";
import {Cell} from "../Cell.ts";
import {Board} from "../Board.ts";
import Mediator from "../service/Mediator.ts";

class Pawn implements Figure{
    figureCoordinates: {x: number, y: number};
    mediator: Mediator;


    constructor(mediator: Mediator, x: number, y: number ) {
        this.mediator = mediator;
        this.figureCoordinates = {x, y};
    }


    public move(cell: Cell) {
        const board = Board.instance;
        const x = this.figureCoordinates.x;
        const y = this.figureCoordinates.y;
        const startMoveCell = board.coordinates[x][y]

        board.removeFigureFromCell(startMoveCell);
        board.displayFigureOrder(cell, this, startMoveCell.displayRotated);
    }


    public checkAvailableCells(){
        const x = this.figureCoordinates.x;
        const y = this.figureCoordinates.y;

        const coords = Board.instance.coordinates;
        const startCell = coords[x][y]
        const cellToCheck: Cell = coords[x][y+1]
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