import { Figure } from "./Figure";

class Cell {
    private coords = {row: 0, column: 0};
    public isOccupied = false;
    public figureOn : Figure | null;

    public constructor(row: number, col: number) {
        this.coords.row = row;
        this.coords.column = col;
        this.figureOn = null;
    }

}



export { Cell };