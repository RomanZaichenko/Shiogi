import {Board} from "../Board.ts";
import Figure from "../Figure.ts";
import {Cell} from "../Cell.ts";
import King from "../figures/King.ts";



interface Mediator {
    canMoveTo(figure: Figure, fromCell: Cell, toCell: Cell): boolean;
    isKingChecked(king: King): boolean;//not final
    //getAllPossibleMoves(figure: Figure, currentCell: Cell): Cell[];
    getMoveOrder(sender: Figure | Board, event: Cell): void;
}

export default Mediator;