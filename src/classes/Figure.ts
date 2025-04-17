import {Cell} from "./Cell.ts";
import Mediator from "./service/Mediator.ts";

interface Figure {
    mediator: Mediator;
    figureCoordinates: {row: number, col: number};


    move(cell: Cell): void;

    checkAvailableCells(): Cell[];

    requestForMove(cell: Cell): void;
}

export default Figure;