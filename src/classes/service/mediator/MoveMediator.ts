import Mediator from "./Mediator.ts";
import Figure from "../../Figure.ts";
import {Cell} from "../../Cell.ts";
import King from "../../figures/King.ts";
import {MoveImplementation} from "../bridge/MoveImplementation.ts";
import {Board} from "../../Board.ts";

class MoveMediator implements Mediator {
    private isWon: boolean = false;
    protected moveImplementation: MoveImplementation;

    setMoveImplementation(moveImpl: MoveImplementation) : void {
        this.moveImplementation = moveImpl;
    }

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

    canCapture(figure: Figure, cell: Cell): boolean {
        const availableCells = figure.checkAvailableCells();
        const captureCells = figure.checkCaptures(availableCells);
        return captureCells.includes(cell);

    }

    getMoveOrder(figure: Figure, cell: Cell) {
        if (this.canMoveTo(figure, cell)) {
            this.moveImplementation.executeMove(figure, cell);

            if (this.isGameOver()){
                this.gameOver(this.isWon);
            }
            else {
                //this.isKingChecked();
            }
        }
    }

    getCaptureOrder(figure: Figure, cell: Cell) {
        if (this.canCapture(figure, cell)) {
            this.moveImplementation.executeMove(figure, cell);

            if (this.isGameOver()) {
                this.gameOver(this.isWon);
            }
            else {
                //this.isKingChecked;
            }
        }
    }
}

export default MoveMediator;