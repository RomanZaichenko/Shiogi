import {React, useState} from "react";
import {Board, BoardContext} from "../classes/Board.ts";


interface BoardProviderProps {
    children: React.ReactNode;
}

const BoardProvider : React.FC<BoardProviderProps> = ({children}) => {
    const [board] = useState(Board.instance);

    const getBoardCell = (row:number, col:number) => {
        return board.getCell(row, col);
    }

    return (
        <BoardContext.Provider value={{board, getBoardCell}}>
            {children}
        </BoardContext.Provider>

    )
}

export default BoardProvider;