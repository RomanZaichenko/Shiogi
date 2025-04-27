import { Cell } from "./Cell";
import Figure from "./Figure";
import KingCreator from "./service/abstractFactory/KingCreator.ts";
import GoldenGeneralCreator from "./service/abstractFactory/GoldenGeneralCreator.ts";
import SilverGeneralCreator from "./service/abstractFactory/SilverGeneralCreator.ts";
import {createContext, useContext, useState} from "react";
import HorseCreator from "./service/abstractFactory/HorseCreator.ts";
import SpearCreator from "./service/abstractFactory/SpearCreator.ts";
import ElephantCreator from "./service/abstractFactory/ElephantCreator.ts";
import RookCreator from "./service/abstractFactory/RookCreator.ts";
import PawnCreator from "./service/abstractFactory/PawnCreator.ts";
import PawnMoveStrategy from "./service/strategy/PawnMoveStrategy.ts";
import MoveDisplayStrategy from "./service/strategy/MoveDisplayStrategy.ts";
import MoveMediator from "./service/mediator/MoveMediator.ts";
import GoldenGeneralMoveStrategy from "./service/strategy/GoldenGeneralMoveStrategy.ts";
import KingMoveStrategy from "./service/strategy/KingMoveStrategy.ts";
import SilverGeneralMoveStrategy from "./service/strategy/SilverGeneralMoveStrategy.ts";
import HorseMoveStrategy from "./service/strategy/HorseMoveStrategy.ts";
import SpearMoveStrategy from "./service/strategy/SpearMoveStrategy.ts";
import ElephantMoveStrategy from "./service/strategy/ElephantMoveStrategy.ts";
import RookMoveStrategy from "./service/strategy/RookMoveStrategy.ts";
import DefaultState from "./service/state/DefaultState.ts";

interface BoardContextType {
    board: Board;
    getBoardCell: (row:number, col:number) => Cell;
    displayAvailableMoves: (availableMoves: Cell[]) => void;
    clearMoves: () => void;
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
    pawnMoveDisplay: MoveDisplayStrategy;
    goldenGeneralMoveDisplay: MoveDisplayStrategy;
    kingMoveDisplay: MoveDisplayStrategy;
    silverGeneralMoveDisplay: MoveDisplayStrategy;
    horseMoveDisplay: MoveDisplayStrategy;
    spearMoveDisplay: MoveDisplayStrategy;
    elephantMoveDisplay: MoveDisplayStrategy;
    rookMoveDisplay: MoveDisplayStrategy;
    mediator: MoveMediator;
    selectedCell: Cell | null = null;
    cellsToMoveDisplay: Cell[] = [];
    private _listeners: (() => void)[] = [];



    private constructor() {
        for (let i = 0; i < 9; i++) {
            this.coordinates[i] = [];
            for (let j = 0; j < 9; j++) {
                this.coordinates[i][j] = new Cell(i, j, false);
            }
        }
        this.pawnMoveDisplay = new MoveDisplayStrategy(new PawnMoveStrategy())
        this.goldenGeneralMoveDisplay = new MoveDisplayStrategy((new GoldenGeneralMoveStrategy))
        this.kingMoveDisplay = new MoveDisplayStrategy(new KingMoveStrategy())
        this.silverGeneralMoveDisplay = new MoveDisplayStrategy(new SilverGeneralMoveStrategy())
        this.horseMoveDisplay = new MoveDisplayStrategy(new HorseMoveStrategy())
        this.spearMoveDisplay = new MoveDisplayStrategy(new SpearMoveStrategy())
        this.elephantMoveDisplay = new MoveDisplayStrategy(new ElephantMoveStrategy())
        this.rookMoveDisplay = new MoveDisplayStrategy(new RookMoveStrategy())
        this.mediator = new MoveMediator();
    }



    public static get instance(): Board {
        if (!Board.#instance) {
            Board.#instance = new Board();
        }
        return Board.#instance;
    }

    public subscribe(listener: () => void) {
        this._listeners.push(listener);
    }

    public unsubscribe(listener: () => void) {
        this._listeners = this._listeners.filter(l => l !== listener);
    }

    private _notifyListeners(): void {
        this._listeners.forEach((listener) => listener());
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
        const king = kingCreator.createFigure(this.mediator, row, column, new DefaultState());
        this.displayFigureOrder(kingCell, king, rotated);
    }

    public goldenGeneralInitiation(row:number, column:number, rotated: boolean) {
        const goldenGeneralCell = this.getCell(row, column);
        const goldenGeneralCreator = new GoldenGeneralCreator()
        const goldenGeneral = goldenGeneralCreator.createFigure(this.mediator, row, column, new DefaultState());
        this.displayFigureOrder(goldenGeneralCell, goldenGeneral, rotated);
    }

    public silverGeneralInitiation(row:number, column:number, rotated: boolean) {
        const silverGeneralCell = this.getCell(row, column);
        const silverGeneralCreator = new SilverGeneralCreator()
        const silverGeneral = silverGeneralCreator.createFigure(this.mediator, row, column, new DefaultState());
        this.displayFigureOrder(silverGeneralCell, silverGeneral, rotated);
    }

    public horseInitiation(row:number, column:number, rotated: boolean) {
        const horseCell = this.getCell(row, column);
        const horseCreator = new HorseCreator();
        const horse = horseCreator.createFigure(this.mediator, row, column, new DefaultState());
        this.displayFigureOrder(horseCell, horse, rotated);
    }

    public spearInitiation(row:number, column:number, rotated: boolean) {
        const spearCell = this.getCell(row, column);
        const spearCreator = new SpearCreator();
        const spear = spearCreator.createFigure(this.mediator, row, column, new DefaultState());
        this.displayFigureOrder(spearCell, spear, rotated);
    }

    public elephantInitiation(row:number, column:number, rotated: boolean) {
        const elephantCell = this.getCell(row, column);
        const elephantCreator = new ElephantCreator();
        const elephant = elephantCreator.createFigure(this.mediator, row, column, new DefaultState());
        this.displayFigureOrder(elephantCell, elephant, rotated);
    }

    public rookInitiation(row:number, column:number, rotated: boolean) {
        const rookCell = this.getCell(row, column);
        const rookCreator = new RookCreator();
        const rook = rookCreator.createFigure(this.mediator, row, column, new DefaultState());
        this.displayFigureOrder(rookCell, rook, rotated);
    }

    public pawnInitiation(row:number, column:number, rotated: boolean) {
        const pawnCell = this.getCell(row, column);
        const pawnCreator = new PawnCreator();
        const pawn = pawnCreator.createFigure(this.mediator, row, column, new DefaultState());
        this.displayFigureOrder(pawnCell, pawn, rotated);
    }


    public getCell(row:number, col:number): Cell {
        return this.coordinates[row][col];
    }

    public displayAvailableMoves(availableMoves: Cell[]) {
        this.clearMoves();
        this.cellsToMoveDisplay = availableMoves;
        availableMoves.forEach(moveVariant => (moveVariant.canMoveTo = true))
        this._notifyListeners();
    }

    public clearMoves(): void {
        this.coordinates.forEach(row => row.forEach(cell => cell.canMoveTo = false));
        this.cellsToMoveDisplay = [];
        this._notifyListeners();
    }

    public moveFigure(cell: Cell) {
        const figureToMove = this.selectedCell?.figureOn;

        figureToMove?.requestForMove(cell);

        this._notifyListeners();
    }

}

export { Board, BoardContext};