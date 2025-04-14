import Mediator from "./Mediator.ts";
import Figure from "../Figure.ts";
import {Cell} from "../Cell.ts";
import King from "../figures/King.ts";


class MoveMediator implements Mediator {
    private isWon: boolean = false;

    canMoveTo(figure: Figure, cell: Cell): boolean {
       const availableCells = figure.checkAvailableCells();
       return availableCells.includes(cell);
    }

    isKingChecked(king :King): boolean {
        return true;
    }

    // getAllPossibleMoves(figure: Figure, currentCell: Cell): Cell[] {
    // }

    isGameOver() : boolean {
        return false;
    }

    gameOver(isWon: boolean) {
    }

    getMoveOrder(figure: Figure, cell: Cell) {
        if (this.canMoveTo(figure, cell)) {
            figure.move(cell);
        }

        if (this.isGameOver()){
            this.gameOver(this.isWon);
        }
        else {
            //this.isKingChecked();
        }
    }
}

export default MoveMediator;