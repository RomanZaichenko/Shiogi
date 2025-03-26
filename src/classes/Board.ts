import { Cell } from "./Cell";

class Board {
    static #instance: Board;
    coordinates: Cell[][] = [];

    private constructor() {
        for (let i = 0; i < 10; i++) {
            this.coordinates[i] = [];
            for (let j = 0; j < 10; j++) {
                this.coordinates[i][j] = new Cell(i, j);
            }
        }
    }

    public static get instance(): Board {
        if (!Board.#instance) {
            Board.#instance = new Board();
        }
        return Board.#instance;
    }
}

export { Board };