import CellElement from "./CellElement.tsx";
import {Cell} from "./classes/Cell.ts";
import './styles/CellRow.css'

interface ICellRowProps {
    row: number;
    coordinates: Cell[][];
}

function CellRow(props: ICellRowProps) {
    const coords = props.coordinates;
    let column = 0;
    return(
        <div className="cell-row">
            <CellElement cell={coords[props.row][column++]} />
            <CellElement cell={coords[props.row][column++]} />
            <CellElement cell={coords[props.row][column++]} />
            <CellElement cell={coords[props.row][column++]} />
            <CellElement cell={coords[props.row][column++]} />
            <CellElement cell={coords[props.row][column++]} />
            <CellElement cell={coords[props.row][column++]} />
            <CellElement cell={coords[props.row][column++]} />
            <CellElement cell={coords[props.row][column++]} />
        </div>
    )
}

export default CellRow;