import Figure from "../Figure.ts";
import Mediator from "./Mediator.ts";

interface FigureCreator {
    createFigure(mediator: Mediator, x: number, y: number): Figure;
}

export default FigureCreator;{}