import StorageCommand from "./StorageCommand.ts";


class SaveStatsCommand implements StorageCommand {
  private wins: number;
  private loses: number;

  constructor(wins: number, loses: number) {
    this.wins = wins;
    this.loses = loses;
  }

  execute() {
    localStorage.setItem("wins", this.wins.toString())
    localStorage.setItem("loses", this.loses.toString())
  }
}

export default SaveStatsCommand;