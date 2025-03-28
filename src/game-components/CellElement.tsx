import {Cell} from "../classes/Cell.ts";
import '../styles/CellElement.css'

interface CellElementProps {
    cell: Cell;
}

function CellElement(props: CellElementProps){
    if (props.cell.isOccupied){
        return(
            <div className="cell">

            </div>
        )
    }
    else{
        return(
            <div className="cell">
            </div>
        )
    }
}

export default CellElement;