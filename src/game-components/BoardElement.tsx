import CellRow from "./CellRow.tsx";
import {Board} from "../classes/Board.ts";
import '../styles/BoardElement.css'

function BoardElement() {
    const board = Board.instance;
    const coords = board.coordinates;

    let row = 0;
    return(
        <section id="board">
            <div id="numbers">
                <p>9</p>
                <p>8</p>
                <p>7</p>
                <p>6</p>
                <p>5</p>
                <p>4</p>
                <p>3</p>
                <p>2</p>
                <p>1</p>
            </div>

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