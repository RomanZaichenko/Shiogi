import '../styles/CellElement.css';
import {Board, useBoard} from "../classes/Board.ts";
import {useState, useEffect, useRef, useContext, createContext} from 'react';
import KingElement from "./figures-elements/KingElement.tsx";
import PawnElement from "./figures-elements/PawnElement.tsx";
import GoldenGeneralElement from "./figures-elements/GoldenGeneralElement.tsx";
import SilverGeneralElement from "./figures-elements/SilverGeneralElement.tsx";
import HorseElement from "./figures-elements/HorseElement.tsx";
import SpearElement from "./figures-elements/SpearElement.tsx";
import ElephantElement from "./figures-elements/ElephantElement.tsx";
import RookElement from "./figures-elements/RookElement.tsx";
import ClickImplementation from "../classes/service/bridge/ClickImplementation.ts";
import DragImplementation from "../classes/service/bridge/DragImplementation.ts";
import GeneralPromotionDecorator from "../classes/service/decorator/GeneralPromotionDecorator.ts";
import DefaultState from "../classes/service/state/DefaultState.ts";


interface CellElementProps {
    row: number;
    col: number;
}

export const CanMoveToContext = createContext(false);

export const FigureComponents = {
    "King": KingElement,
    "GoldenGeneral": GoldenGeneralElement,
    "SilverGeneral": SilverGeneralElement,
    "Horse": HorseElement,
    "Spear": SpearElement,
    "Elephant": ElephantElement,
    "Rook": RookElement,
    "Pawn": PawnElement,
}

function CellElement({row, col}: CellElementProps) {
    const {getBoardCell} = useBoard();
    const cell = getBoardCell(row, col);
    const [isOccupied, setOccupied] = useState(cell.isOccupied);
    const [displayRotated, setRotated] = useState(cell.displayRotated);
    const [canMoveTo, setCanMoveTo] = useState(false);
    const [canCapture, setCanCapture] = useState(false);
    const figure = useRef<HTMLDivElement>(null);
    const canMoveDot = useRef<HTMLDivElement>(null);
    const board = Board.instance;
    const clickImplementation = new ClickImplementation();
    const dragImplementation = new DragImplementation();

    let figureElement = null;

    const onCellClick = () => {
        if (cell.isOccupied && !cell.canCapture) {
            board.selectedCell = cell;
        } else if (cell.canMoveTo) {
            if (board.selectedCell || board.figureToDrop) {

                const figureToMove = board.selectedCell?.figureOn ? board.selectedCell.figureOn : board.figureToDrop;;
                if (figureToMove) {

                    board.mediator.setMoveImplementation(clickImplementation);

                    if (cell.canCapture) {
                        if (board.currentTurn == "sente") {
                            let figure = cell.figureOn;

                            figure?.setFigureState(new DefaultState())
                            figure?.setRow(-1)
                            figure?.setCol(-1)
                            figure?.setCaptured();
                            if (cell.isOccupied) {
                                board.senteCapturedFigures.push(figure);
                            }
                            console.log("Sente pushed")
                            console.log(board.senteCapturedFigures);
                        }
                        else {
                            const figure = cell.figureOn;

                            figure?.setFigureState(new DefaultState())
                            figure?.setRow(-1)
                            figure?.setCol(-1)
                            figure?.setCaptured();
                            if (cell.isOccupied) {
                                board.goteCapturedFigures.push(figure);
                            }
                            console.log("Gote pushed")
                            console.log(board.goteCapturedFigures);
                        }

                    }

                    if (!cell.canCapture) {
                        if (board.currentTurn == "sente") {
                            cell.displayRotated = false;
                        }
                        else{
                            cell.displayRotated = true;
                        }
                    }

                    board.moveFigure(cell);
                    board.clearMoves();
                    board.selectedCell = null;

                }
            }
        }

    };

    const onFigureDrop = () => {
        console.log(cell.canMoveTo)
        if (cell.canMoveTo) {
            const startingCell = board.selectedCell ? board.selectedCell : null;
            if (startingCell || board.figureToDrop) {
                const figureToDrop = startingCell?.figureOn || board.figureToDrop;


                if (figureToDrop) {
                    board.mediator.setMoveImplementation(dragImplementation);

                    if (cell.canCapture) {
                        if (board.currentTurn == "sente") {
                            const figure = cell.figureOn;

                            figure?.setFigureState(new DefaultState())
                            figure?.setRow(-1)
                            figure?.setCol(-1)
                            figure?.setCaptured();
                            if (cell.isOccupied) {
                                board.senteCapturedFigures.push(figure);
                            }
                            console.log("Sente pushed")
                            console.log(board.senteCapturedFigures);
                        }
                        else {
                            const figure = cell.figureOn;


                            figure?.setFigureState(new DefaultState())
                            figure?.setRow(-1)
                            figure?.setCol(-1)
                            figure?.setCaptured();
                            if (cell.isOccupied) {
                                board.goteCapturedFigures.push(figure);

                            }
                            console.log("Just pushed")
                            console.log(board.goteCapturedFigures);
                        }

                    }
                    board.moveFigure(cell);
                    board.clearMoves();
                    board.selectedCell = null;
                }
                }
            } else {
                board.clearMoves();
            }
    }

    useEffect(() => {
        const listener = () => {
            const updatedCell = board.getCell(row, col);
            setOccupied(updatedCell.isOccupied);
            setRotated(updatedCell.displayRotated);
            setCanMoveTo(updatedCell.canMoveTo);
            setCanCapture(updatedCell.canCapture);
        };

        board.subscribe(listener);

        return () => {
            board.unsubscribe(listener);
        }
    }, [board, row, col]);


    useEffect(() => {
        setOccupied(cell.isOccupied);
        setRotated(cell.displayRotated);
    }, [cell.isOccupied, cell.displayRotated]);

    useEffect(() => {
        setCanMoveTo(cell.canMoveTo);
    }, [cell.canMoveTo]);

    useEffect(() => {
        setCanCapture(cell.canCapture);
    }, [cell.canCapture]);

    if (cell.isOccupied) {
        let name = cell.figureOn.constructor.name;
        if (cell.figureOn.constructor.name === "GeneralPromotionDecorator") {
            const decorateCell: GeneralPromotionDecorator = cell.figureOn;

            const figureName = decorateCell.figure.constructor.name;

            switch (figureName) {
                case "Pawn":
                    name = "Pawn";
                    break;
                case "Horse":
                    name = "Horse";
                    break;
                case "SilverGeneral":
                    name = "SilverGeneral";
                    break;
                case "Spear":
                    name = "Spear";
                    break;
            }
        } else if (cell.figureOn.constructor.name === "ElephantPromotionDecorator") {
            name = "Elephant";
        } else if (cell.figureOn.constructor.name === "RookPromotionDecorator") {
            name = "Rook";
        }


        const FigureComponent = FigureComponents[name];
        figureElement = <FigureComponent rotated={cell.displayRotated} row={row} col={col} isCaptured={false}/>;

        if (cell.canCapture) {
            return (
              <CanMoveToContext value={cell.canCapture}>
                  <div className="cell-capture" onClick={onCellClick} onDrop={onFigureDrop}
                       onDragOver={(event) => event.preventDefault()}>

                      <div className={cell.displayRotated ? "figure-rotated" : "figure"} ref={figure}>
                          {figureElement}
                      </div>
                  </div>
              </CanMoveToContext>
            )
        }
        else {
            return (
              <div className="cell" onClick={onCellClick} onDrop={onFigureDrop}>
                  <div className={cell.displayRotated ? "figure-rotated" : "figure"} ref={figure}>
                      {figureElement}
                  </div>
              </div>
            )
        }
    }
    else if (cell.canMoveTo) {

        return (
          <CanMoveToContext.Provider value={cell.canMoveTo}>
              <div className="cell" onClick={onCellClick}
                   onDrop={onFigureDrop}
                   onDragOver={(event) => event.preventDefault()}>
                  <div className={"cell-dot"} ref={canMoveDot}>
                  </div>
              </div>
          </CanMoveToContext.Provider>
        )
    }  else {
        return (
          <div className="cell" onClick={onCellClick}>
          </div>
        )
    }
}

export default CellElement;