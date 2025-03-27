import {Board} from "./classes/Board.ts";
import './styles/GameArea.css'


function GameArea() {

    const board = Board.instance;
    const coords = board.coordinates;

    return (
        <main id="game-area">

        </main>
    );
}

export default GameArea;