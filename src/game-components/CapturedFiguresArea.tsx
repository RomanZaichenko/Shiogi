import {Board} from "../classes/Board.ts";
import {useState, useEffect} from "react";
import Figure from "../classes/Figure.ts";
import CapturedElement from "./CapturedElement.tsx";
import "../styles/CaptureArea.css"

interface CapturedFiguresAreaProps {
  side: string;
}

function CapturedFiguresArea({side}: CapturedFiguresAreaProps) {
  const [capturedFigures, setCapturedFigures] = useState<Figure[]>([]);
  const board = Board.instance


  useEffect(() => {
    const listener = () => {
      setCapturedFigures([...board.capturedFigures]);
    };

    board.subscribe(listener);

    return () => {
      board.unsubscribe(listener);
    }
  }, [board]);



  return (
    <div className={`captured-figure-area ${side}`}>
      {capturedFigures.map((figure: Figure, index) => (
        <CapturedElement key={index} figure={figure}/>
      ))}
    </div>
  )

}

export default CapturedFiguresArea;