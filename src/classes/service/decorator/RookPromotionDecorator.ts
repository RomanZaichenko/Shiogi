import FigurePromotionDecorator from "./FigurePromotionDecorator.ts";
import {Cell} from "../../Cell.ts";
import {Board} from "../../Board.ts";

class RookPromotionDecorator extends FigurePromotionDecorator {
  checkAvailableCells(): Cell[] {
    // const availableCells = super.checkAvailableCells();

    //TODO use super.checkAvailableCells for checking default moves

    const board = Board.instance;
    console.log(this.figureCoordinates);
    const row = this.figureCoordinates.row;
    const col = this.figureCoordinates.col;

    const startCell = board.getCell(row, col);
    let cellToCheck: Cell;
    const availableCells: Cell[] = [];


    if (row - 1 >= 0) {
      let rowCount = row;
      do {
        cellToCheck = board.getCell(rowCount-1, col);
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
        rowCount--;
      }
      while (rowCount - 1 >= 0);
    }

    if (row + 1 <= 8) {
      let rowCount = row;

      do {
        cellToCheck = board.getCell(rowCount+1, col);
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
        rowCount++;
      }
      while (rowCount + 1 <= 8);
    }

    if (col - 1 >= 0) {

      let colCount = col;
      do {
        cellToCheck = board.getCell(row, colCount-1);
        if((cellToCheck.displayRotated != startCell.displayRotated) ||
          !cellToCheck.isOccupied ) {
          availableCells.push(cellToCheck);

          if (cellToCheck.isOccupied) {
            break;
          }
        }
        else {break;}

        colCount--;
      }
      while (colCount - 1 >= 0);
    }

    if (col + 1 <= 8) {
      let colCount = col;
      do {
        cellToCheck = board.getCell(row, colCount+1);
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

        colCount++;
      }
      while (colCount + 1 <= 8);
    }

    if (this.isCellAvailable(row-1, col-1, board)) {
      availableCells.push(board.getCell(row-1, col-1));
    }
    if(this.isCellAvailable(row+1, col+1, board)) {
      availableCells.push(board.getCell(row+1, col+1));
    }
    if (this.isCellAvailable(row+1, col-1, board)) {
      availableCells.push(board.getCell(row+1, col-1));
    }
    if (this.isCellAvailable(row-1, col+1, board)) {
      availableCells.push(board.getCell(row-1, col+1));
    }


    return availableCells;
  }

  isCellAvailable(row:number, col:number, board: Board): boolean {
    const startCell = board.selectedCell;
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
}

export default RookPromotionDecorator;