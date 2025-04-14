import '../styles/CellElement.css';
import {useBoard} from "../classes/Board.ts";
import {useState,useEffect, useRef} from 'react';
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
    const figure = useRef<HTMLDivElement>(null);

    let figureElement = null;

    useEffect(() => {
        setOccupied(cell.isOccupied);
        setRotated(cell.displayRotated);
    }, [isOccupied, displayRotated]);

    if (cell.isOccupied){
        const FigureComponent= FigureComponents[cell.figureOn.constructor.name];
        figureElement = <FigureComponent rotated = {cell.displayRotated}/>;

        return(
            <div className="cell">
                <div className={cell.displayRotated ? "figure-rotated" : "figure"} ref={figure}>
                    {figureElement}
                </div>
            </div>
        )
    }
    else{
        return(
            <div className="cell">
            </div>
        )
    }
}

export default CellElement;