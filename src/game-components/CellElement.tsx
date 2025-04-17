import '../styles/CellElement.css';
import {Board, useBoard} from "../classes/Board.ts";
import {useState,useEffect, useRef, useContext} from 'react';
import KingElement from "./figures-elements/KingElement.tsx";
import PawnElement from "./figures-elements/PawnElement.tsx";
import GoldenGeneralElement from "./figures-elements/GoldenGeneralElement.tsx";
import SilverGeneralElement from "./figures-elements/SilverGeneralElement.tsx";
import HorseElement from "./figures-elements/HorseElement.tsx";
import SpearElement from "./figures-elements/SpearElement.tsx";
import ElephantElement from "./figures-elements/ElephantElement.tsx";
import RookElement from "./figures-elements/RookElement.tsx";
import {createContext} from "react";
import BoardProvider from "./BoardProvider.tsx";


export const CanMoveToContext = createContext(false)

interface CellElementProps {
    row: number;
    col: number;
}

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
    const {getBoardCell, displayAvailableMoves} = useBoard();
    const cell = getBoardCell(row, col);
    const [isOccupied, setOccupied] = useState(cell.isOccupied);
    const [displayRotated, setRotated] = useState(cell.displayRotated);
    const [canMoveTo, setCanMoveTo] = useState(false);
    const figure = useRef<HTMLDivElement>(null);
    const canMoveDot = useRef<HTMLDivElement>(null);
    const board = Board.instance;
    const [tick, setTick] = useState(0);
    let figureElement = null;

    const onCellClick = () => {
        if(cell.isOccupied){
            board.pawnMoveDisplay.displayMoves(cell);
            const movesToDisplay = board.cellsToMoveDisplay;
            displayAvailableMoves(movesToDisplay);
        }
        else if(cell.canMoveTo){

        }
        else{

        }
    };

    useEffect(() => {

    }, [cell]);


    useEffect(() => {
        const listener = () => {
            setTick(prevTick => prevTick+1);
        };

        board.subscribe(listener);

        return () => {
            board.unsubscribe(listener);
        }
    }, [board]);

    useEffect(() => {
        setOccupied(cell.isOccupied);
        setRotated(cell.displayRotated);
    }, [cell.isOccupied, cell.displayRotated]);

    useEffect(() => {
        console.log("here");
       setCanMoveTo(cell.canMoveTo);
    }, [cell.canMoveTo]);

    if (cell.isOccupied){
        const FigureComponent= FigureComponents[cell.figureOn.constructor.name];
        figureElement = <FigureComponent rotated = {cell.displayRotated}/>;

        return(
            <div className="cell" onClick={onCellClick}>
                <div className={cell.displayRotated ? "figure-rotated" : "figure"} ref={figure}>
                    {figureElement}
                </div>
            </div>
        )
    }
    else if (cell.canMoveTo){
        const cellMoveContext = useContext(CanMoveToContext);
        return (
          <CanMoveToContext value={cell.canMoveTo}>
            <div className="cell" onClick={onCellClick}>
                <div className={"cell-dot"} ref={canMoveDot}>
                </div>
            </div>
          </CanMoveToContext>
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