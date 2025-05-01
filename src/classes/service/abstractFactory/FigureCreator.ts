import Figure from "../../Figure.ts";
import Mediator from "../mediator/Mediator.ts";
import FigureState from "../state/FigureState.ts";

interface FigureCreator {
    createFigure(mediator: Mediator, x: number, y: number, state: FigureState): Figure;
}

export default FigureCreator;