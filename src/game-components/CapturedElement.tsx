import {useState, useEffect} from "react";
import Figure from "../classes/Figure.ts";
import {Board} from "../classes/Board.ts";
import GeneralPromotionDecorator from "../classes/service/decorator/GeneralPromotionDecorator.ts";
import PawnCreator from "../classes/service/abstractFactory/PawnCreator.ts";
import HorseCreator from "../classes/service/abstractFactory/HorseCreator.ts";
import SilverGeneralCreator from "../classes/service/abstractFactory/SilverGeneralCreator.ts";
import SpearCreator from "../classes/service/abstractFactory/SpearCreator.ts";
import ElephantCreator from "../classes/service/abstractFactory/ElephantCreator.ts";
import RookCreator from "../classes/service/abstractFactory/RookCreator.ts";
import DefaultState from "../classes/service/state/DefaultState.ts";
import {FigureComponents} from "./CellElement.tsx";


interface CapturedElementProps {
  figure: Figure;
}

function CapturedElement({ figure }: CapturedElementProps) {
  let figureElement = null;
  const pawnCreator = new PawnCreator();
  const horseCreator = new HorseCreator();
  const silverGeneralCreator = new SilverGeneralCreator();
  const spearCreator = new SpearCreator();
  const elephantCreator = new ElephantCreator();
  const rookCreator = new RookCreator();
  const board = Board.instance

  if (figure == undefined) {
    return;
  }

  const mediator = figure?.mediator;
  const row = figure?.getRow()
  const col = figure?.getCol()


  let name = figure?.constructor.name;
  if (name === "GeneralPromotionDecorator") {
    const decorateCell: GeneralPromotionDecorator = figure;

    const figureName = decorateCell.figure.constructor.name;

    console.log(figureName);
    switch (figureName) {
      case "Pawn":
        name = "Pawn";
        figure = pawnCreator.createFigure(mediator, row, col, new DefaultState())
        break;
      case "Horse":
        name = "Horse";
        figure = horseCreator.createFigure(mediator, row, col, new DefaultState())
        break;
      case "SilverGeneral":
        name = "SilverGeneral";
        figure = silverGeneralCreator.createFigure(mediator, row, col, new DefaultState())
        break;
      case "Spear":
        name = "Spear";
        figure = spearCreator.createFigure(mediator, row, col, new DefaultState())
        break;
    }
  } else if (figure?.constructor.name === "ElephantPromotionDecorator") {
    name = "Elephant";
    figure = elephantCreator.createFigure(mediator, row, col, new DefaultState())
  } else if (figure?.constructor.name === "RookPromotionDecorator") {
    name = "Rook";
    figure = rookCreator.createFigure(mediator, row, col, new DefaultState())
  }

  const FigureComponent = FigureComponents[name];
  figureElement = <FigureComponent rotated={false} row={row} col={col} isCaptured={true} figure={figure}/>;

  return (
    <div className="captured-figure">
      {figureElement}
    </div>
  )
}

export default CapturedElement;