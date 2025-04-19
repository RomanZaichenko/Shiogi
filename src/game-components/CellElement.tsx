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


interface CellElementProps {
    row: number;
    col: number;
}

export const CanMoveToContext = createContext(false);

const FigureComponents = {
    "King": KingElement,
    "GoldenGeneral": GoldenGeneralElement,
    "SilverGeneral": SilverGeneralElement,
    "Horse": HorseElement,
    "Spear": SpearElement,
    "Elephant": ElephantElement,
    "Rook": RookElement,
    "Pawn": PawnElement,
}

function CellElement({row, col}: CellElementProps){
    const {getBoardCell} = useBoard();
    const cell = getBoardCell(row, col);
    const [isOccupied, setOccupied] = useState(cell.isOccupied);
    const [displayRotated, setRotated] = useState(cell.displayRotated);
    const [canMoveTo, setCanMoveTo] = useState(false);
    const figure = useRef<HTMLDivElement>(null);
    const canMoveDot = useRef<HTMLDivElement>(null);
    const board = Board.instance;

    let figureElement = null;

    const onCellClick = () => {
        if(cell.isOccupied){
            board.selectedCell = cell;
        }
        else if(cell.canMoveTo){
            if (board.selectedCell){
                const figureToMove = board.selectedCell.figureOn;

                if(figureToMove){
                    console.log(board.selectedCell);
                    board.moveFigure(cell);
                    board.clearMoves();
                    board.selectedCell = null;
                    console.log(board.selectedCell)
                }
            }
        }
        else{
            board.clearMoves();
        }
    };

    useEffect(() => {
        const listener = () => {
            const updatedCell = board.getCell(row, col);
            setOccupied(updatedCell.isOccupied);
            setRotated(updatedCell.displayRotated);
            setCanMoveTo(updatedCell.canMoveTo);
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

    if (cell.isOccupied){
        const FigureComponent= FigureComponents[cell.figureOn.constructor.name];
        figureElement = <FigureComponent rotated = {cell.displayRotated} row = {row} col = {col}/>;

        return(
            <div className="cell" onClick={onCellClick}>
                <div className={cell.displayRotated ? "figure-rotated" : "figure"} ref={figure}>
                    {figureElement}
                </div>
            </div>
        )
    }
    else if (cell.canMoveTo){

        return (
          <CanMoveToContext.Provider value={cell.canMoveTo}>
            <div className="cell" onClick={onCellClick}>
                <div className={"cell-dot"} ref={canMoveDot}>
                </div>
            </div>
          </CanMoveToContext.Provider>
        )
    }
    else{
        return(
            <div className="cell" onClick={onCellClick}>
            </div>
        )
    }
}

export default CellElement;