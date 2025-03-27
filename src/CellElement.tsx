import {Cell} from "./classes/Cell.ts";
import './styles/CellElement.css'

interface ICellElementProps {
    cell: Cell;
}

function CellElement(props: ICellElementProps){
    if (props.cell.isOccupied){
        return(
            <div className="cell">
                <div className="figure">

                </div>
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