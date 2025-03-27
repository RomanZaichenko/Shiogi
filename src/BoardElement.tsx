import CellRow from "./CellRow.tsx";
import {Board} from "./classes/Board.ts";
import './styles/BoardElement.css'

function BoardElement() {
    const board = Board.instance;
    const coords = board.coordinates;

    let row = 0;
    return(
        <section id="board">
            <CellRow row={row++} coordinates={coords}/>
            <CellRow row={row++} coordinates={coords}/>
            <CellRow row={row++} coordinates={coords}/>
            <CellRow row={row++} coordinates={coords}/>
            <CellRow row={row++} coordinates={coords}/>
            <CellRow row={row++} coordinates={coords}/>
            <CellRow row={row++} coordinates={coords}/>
            <CellRow row={row++} coordinates={coords}/>
            <CellRow row={row++} coordinates={coords}/>
        </section>
    )
}

export default BoardElement;