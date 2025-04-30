import Mediator from "./Mediator.ts";
import Figure from "../../Figure.ts";
import {Cell} from "../../Cell.ts";
import King from "../../figures/King.ts";
import {MoveImplementation} from "../bridge/MoveImplementation.ts";
import {Board} from "../../Board.ts";
import figure from "../../Figure.ts";
import boardProvider from "../../../game-components/BoardProvider.tsx";
import Move from "../../Move.ts";

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
        const board = Board.instance;
        const kingRow = king.getRow();
        const kingCol = king.getCol();
        const kingCell = board.getCell(kingRow, kingCol);

        for (let row of board.coordinates) {
            for (let cell of row) {
                if (cell.isOccupied && cell.figureOn?.constructor.name !== king.constructor.name) {
                    const availableCells = cell.figureOn?.checkAvailableCells();
                    const captures = cell.figureOn?.checkCaptures(availableCells);

                    if (captures && captures.some(capturedCell => capturedCell.figureOn === king)) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    // getAllPossibleMoves(figure: Figure, currentCell: Cell): Cell[] {
    // }

    isGameOver() : boolean {
        const board = Board.instance;
        const currentPlayer = board.currentTurn;
        const opponentKing = currentPlayer === "sente" ? board.goteKing : board.senteKing;

        board.currentTurn = currentPlayer === "sente" ? "gote" : "sente";
        const opponentMoves = this.checkLegalMoves();
        board.currentTurn = currentPlayer; // revert

        if (opponentMoves.length === 0 && this.isKingChecked(opponentKing)) {
            this.isWon = true;
            return true;
        }

        return false;
    }

    gameOver(isWon: boolean) {
        if (isWon) {
            console.log("You won!");
        }
        else {
            console.log("You lost!");
        }
    }

    canCapture(figure: Figure, cell: Cell): boolean {
        const availableCells = figure.checkAvailableCells();
        const captureCells = figure.checkCaptures(availableCells);
        return captureCells.includes(cell);

    }

    getMoveOrder(figure: Figure, cell: Cell) {
        const board = Board.instance;

        if (this.canMoveTo(figure, cell)) {
            this.moveImplementation.executeMove(figure, cell);

            if (this.isGameOver()){
                this.gameOver(this.isWon);
            }
            else {
               if (board.currentTurn == "sente") {
                   if(this.isKingChecked(board.goteKing)){
                       console.log("gote checked");
                   }
               }
               else {
                   if(this.isKingChecked(board.senteKing)){
                       console.log("sente checked");
                   }
               }
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

    checkLegalMoves(): Move[] {
        const board = Board.instance;
        const coords = board.coordinates;
        const legalMoves: Move[] = [];

        if (board.currentTurn == "sente") {
            coords.forEach((row) => {
                row.forEach((cell) => {
                    if (!cell.displayRotated && cell.isOccupied) {
                        const cells = cell.figureOn?.checkAvailableCells();

                        cells?.forEach(targetCell => {
                            if (!this.isKingChecked(board.goteKing)) {
                                const move = new Move(cell?.figureOn, cell, targetCell);

                                legalMoves.push(move);
                            }
                        })
                    }
                })
            })
        }
        else {
            coords.forEach((row) => {
                row.forEach((cell) => {
                    if (cell.displayRotated) {
                        const cells = cell.figureOn?.checkAvailableCells();

                        cells?.forEach(targetCell => {
                            if (!this.isKingChecked(board.senteKing)) {
                                const move = new Move(cell?.figureOn, cell, targetCell);

                                legalMoves.push(move);
                            }
                        })
                    }
                })
            })
        }
        console.log(legalMoves);
        return legalMoves;
    }

    isLegalMove(figure: Figure, startCell: Cell, targetCell: Cell): boolean {
        const moves = this.checkLegalMoves();
        const moveToCheck = new Move(figure, startCell, targetCell);
        let isLegal = false;

        console.log("inside");
        console.log(moves);
        console.log(moveToCheck);
        moves.forEach((move) => {

            if (move.figureToMove == moveToCheck.figureToMove &&
                move.startCell == moveToCheck.startCell &&
                move.targetCell == moveToCheck.targetCell) {

                console.log("treu");
                isLegal =  true;

            }
        })

        return false;
    }
}

export default MoveMediator;