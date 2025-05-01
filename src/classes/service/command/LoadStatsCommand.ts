import StorageCommand from "./StorageCommand.ts";
import {Board} from "../../Board.ts";

class LoadStatsCommand implements StorageCommand {
  private setWins: (wins:number, board: Board) => void = (num: number, board: Board) => {
    board.winsCounter = num;
  };

  private setLoses: (loses:number, board: Board) => void = (num: number, board: Board) => {

    board.losesCounter = num;
  };



  execute() {
    const wins = parseInt(localStorage.getItem("wins"), 10);
    const loses = parseInt(localStorage.getItem("loses"), 10);
    const board = Board.instance

    this.setWins(wins, board);
    this.setLoses(loses, board);
  }
}

export default LoadStatsCommand;