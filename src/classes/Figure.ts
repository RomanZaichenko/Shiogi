import {Cell} from "./Cell.ts";
import Mediator from "./service/Mediator.ts";

interface Figure {
    mediator: Mediator;
    figureCoordinates: {x: number, y: number};


    move(cell: Cell): void;

    checkAvailableCells(): Cell[];
}

export default Figure;