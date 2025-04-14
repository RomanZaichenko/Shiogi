import { Cell } from "./Cell";
import Figure from "./Figure";
import KingCreator from "./service/KingCreator.ts";
import GoldenGeneralCreator from "./service/GoldenGeneralCreator.ts";
import SilverGeneralCreator from "./service/SilverGeneralCreated.ts";
import {createContext, useContext} from "react";
import HorseCreator from "./service/HorseCreator.ts";
import SpearCreator from "./service/SpearCreator.ts";
import ElephantCreator from "./service/ElephantCreator.ts";
import RookCreator from "./service/RookCreator.ts";
import PawnCreator from "./service/PawnCreator.ts";

interface BoardContextType {
    board: Board;
    getBoardCell: (row:number, col:number) => Cell;
}

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export const useBoard = () : BoardContextType => {
    const context = useContext(BoardContext);

    if (!context) {
        throw new Error("useBoard must be used within a BoardProvider");
    }
    return context;
}

class Board {
    static #instance: Board;
    coordinates: Cell[][] = [];

    private constructor() {
        for (let i = 0; i < 9; i++) {
            this.coordinates[i] = [];
            for (let j = 0; j < 9; j++) {
                this.coordinates[i][j] = new Cell(i, j, false);
            }
        }
    }

    public static get instance(): Board {
        if (!Board.#instance) {
            Board.#instance = new Board();
        }
        return Board.#instance;
    }

    public initiateGame() {
        //Kings initiation
        this.kingInitiation(0, 4, true);
        this.kingInitiation(8, 4, false);


        //Golden generals initiation
        this.goldenGeneralInitiation(0, 3, true);
        this.goldenGeneralInitiation(0, 5, true);
        this.goldenGeneralInitiation(8, 3, false);
        this.goldenGeneralInitiation(8, 5, false);

        //Silver generals initiation
        this.silverGeneralInitiation(0, 2, true);
        this.silverGeneralInitiation(0, 6, true);
        this.silverGeneralInitiation(8, 2, false);
        this.silverGeneralInitiation(8, 6, false);

        //Horses initiation
        this.horseInitiation(0, 1, true);
        this.horseInitiation(0, 7, true);
        this.horseInitiation(8, 1, false);
        this.horseInitiation(8, 7, false);

        //Spears initiation
        this.spearInitiation(0, 0, true);
        this.spearInitiation(0, 8, true);
        this.spearInitiation(8, 0, false);
        this.spearInitiation(8, 8, false);

        //Elephants initiation
        this.elephantInitiation(1, 7, true);
        this.elephantInitiation(7, 1, false);

        //Rooks initiation
        this.rookInitiation(1, 1, true);
        this.rookInitiation(7, 7, false);

        //Pawns initiation
        for (let i=0; i < 9; i++) {
            this.pawnInitiation(2, i, true);
        }

        for (let i=0; i < 9; i++) {
            this.pawnInitiation(6, i, false);
        }
    }

    public displayFigureOrder(cell: Cell, figure: Figure, rotated: boolean) {
        cell.isOccupied = true;
        cell.figureOn = figure;
        cell.displayRotated = rotated;
    }

    public removeFigureFromCell(cell: Cell) {
        cell.isOccupied = false;
        cell.figureOn = null;
    }

    public kingInitiation(row:number, column:number, rotated: boolean) {
        const kingCell = this.getCell(row, column);
        const kingCreator = new KingCreator()
        const king = kingCreator.createFigure();
        this.displayFigureOrder(kingCell, king, rotated);
    }

    public goldenGeneralInitiation(row:number, column:number, rotated: boolean) {
        const goldenGeneralCell = this.getCell(row, column);
        const goldenGeneralCreator = new GoldenGeneralCreator()
        const goldenGeneral = goldenGeneralCreator.createFigure();
        this.displayFigureOrder(goldenGeneralCell, goldenGeneral, rotated);
    }

    public silverGeneralInitiation(row:number, column:number, rotated: boolean) {
        const silverGeneralCell = this.getCell(row, column);
        const silverGeneralCreator = new SilverGeneralCreator()
        const silverGeneral = silverGeneralCreator.createFigure();
        this.displayFigureOrder(silverGeneralCell, silverGeneral, rotated);
    }

    public horseInitiation(row:number, column:number, rotated: boolean) {
        const horseCell = this.getCell(row, column);
        const horseCreator = new HorseCreator();
        const horse = horseCreator.createFigure();
        this.displayFigureOrder(horseCell, horse, rotated);
    }

    public spearInitiation(row:number, column:number, rotated: boolean) {
        const spearCell = this.getCell(row, column);
        const spearCreator = new SpearCreator();
        const spear = spearCreator.createFigure();
        this.displayFigureOrder(spearCell, spear, rotated);
    }

    public elephantInitiation(row:number, column:number, rotated: boolean) {
        const elephantCell = this.getCell(row, column);
        const elephantCreator = new ElephantCreator();
        const elephant = elephantCreator.createFigure();
        this.displayFigureOrder(elephantCell, elephant, rotated);
    }

    public rookInitiation(row:number, column:number, rotated: boolean) {
        const rookCell = this.getCell(row, column);
        const rookCreator = new RookCreator();
        const rook = rookCreator.createFigure();
        this.displayFigureOrder(rookCell, rook, rotated);
    }

    public pawnInitiation(row:number, column:number, rotated: boolean) {
        const pawnCell = this.getCell(row, column);
        const pawnCreator = new PawnCreator();
        const pawn = pawnCreator.createFigure();
        this.displayFigureOrder(pawnCell, pawn, rotated);
    }


    public getCell(row:number, col:number): Cell {
        return this.coordinates[row][col];
    }

}

export { Board, BoardContext };