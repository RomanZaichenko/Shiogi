import FigurePromotionDecorator from "./FigurePromotionDecorator.ts";
import {Cell} from "../../Cell.ts";
import {Board} from "../../Board.ts";

class ElephantPromotionDecorator extends FigurePromotionDecorator {
  checkAvailableCells(): Cell[] {
    //? Бере координати з батьківського елементу
    //const availableCells = super.checkAvailableCells();
    //TODO: Implement super from contructor taking available cells

    const board = Board.instance;
    const row = this.figureCoordinates.row;
    const col = this.figureCoordinates.col;

    const startCell = board.getCell(row, col);
    let cellToCheck: Cell;
    const availableCells: Cell[] = [];


    if (row - 1 >= 0 && col - 1 >= 0) {
      let rowCount = row;
      let colCount = col;
      do {
        cellToCheck = board.getCell(rowCount-1, colCount-1);
        if(!cellToCheck.isOccupied ||
          (cellToCheck.displayRotated != startCell.displayRotated)) {
          availableCells.push(cellToCheck);
          if (cellToCheck.isOccupied) {
            break;
          }
        }
        else {
          break;
        }
        rowCount--;
        colCount--;
      }
      while (rowCount - 1 >= 0 && colCount - 1 >= 0);
    }

    if (row - 1 >= 0 && col + 1 <= 8) {
      let rowCount = row;
      let colCount = col;
      do {
        cellToCheck = board.getCell(rowCount-1, colCount+1);
        if((cellToCheck.displayRotated != startCell.displayRotated) ||
          !cellToCheck.isOccupied ) {
          availableCells.push(cellToCheck);

          if (cellToCheck.isOccupied) {
            break;
          }
        }
        else{
          break;
        }
        rowCount--;
        colCount++;
      }
      while ((rowCount - 1 >= 0 && colCount + 1 <= 8));
    }

    if (row + 1 <= 8 && col - 1 >= 0) {
      let rowCount = row;
      let colCount = col;
      do {
        cellToCheck = board.getCell(rowCount+1, colCount-1);
        if((cellToCheck.displayRotated != startCell.displayRotated) ||
          !cellToCheck.isOccupied ) {
          availableCells.push(cellToCheck);

          if (cellToCheck.isOccupied) {
            break;
          }
        }
        else {
          break;
        }
        rowCount++;
        colCount--;
      }
      while ((rowCount + 1 <= 8 && colCount - 1 >= 0));
    }

    if (row + 1 <= 8 && col + 1 <= 8) {
      let rowCount = row;
      let colCount = col;
      do {
        cellToCheck = board.getCell(rowCount+1, colCount+1);
        if((cellToCheck.displayRotated != startCell.displayRotated) ||
          !cellToCheck.isOccupied ) {
          availableCells.push(cellToCheck);

          if (cellToCheck.isOccupied) {
            break;
          }
        }
        else {
          break;
        }
        rowCount++;
        colCount++;
      }
      while ((rowCount + 1 <= 8 && colCount + 1 <= 8));
    }

    if (this.isCellAvailable(row-1, col, board)) {
      availableCells.push(board.getCell(row-1, col));
    }
    if(this.isCellAvailable(row+1, col, board)) {
      availableCells.push(board.getCell(row+1, col));
    }
    if (this.isCellAvailable(row, col-1, board)) {
      availableCells.push(board.getCell(row, col-1));
    }
    if (this.isCellAvailable(row, col+1, board)) {
      availableCells.push(board.getCell(row, col+1));
    }
    return availableCells;
  }

  isCellAvailable(row:number, col:number, board: Board): boolean {

    const startCell = board.getCell(this.getRow(), this.getCol());
    let cellToCheck;


    if ((row >= 0 && row <= 8) && (col >= 0 && col <= 8)) {
      cellToCheck = board.getCell(row, col);
    }
    else {
      return false;
    }


    return (!cellToCheck?.isOccupied ||
      (cellToCheck.displayRotated != startCell?.displayRotated));
  }
  public checkCaptures(cells: Cell[]) :Cell[] {
    const board = Board.instance;
    const startCell = board.getCell(this.getRow(), this.getCol());
    const cellsToCapture :Cell[] = [];
    cells.forEach((cell: Cell) => {
      if(cell.displayRotated != startCell.displayRotated){
        cellsToCapture.push(cell);
      }
    })



    return cellsToCapture;
  }
}

export default ElephantPromotionDecorator;