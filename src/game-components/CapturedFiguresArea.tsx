import {Board} from "../classes/Board.ts";
import {useState, useEffect} from "react";
import Figure from "../classes/Figure.ts";
import CapturedElement from "./CapturedElement.tsx";
import "../styles/CaptureArea.css"

interface CapturedFiguresAreaProps {
  side: string;
  owner: string;
}

function CapturedFiguresArea({side, owner}: CapturedFiguresAreaProps) {
  const [capturedFigures, setCapturedFigures] = useState<Figure[]>([]);
  const board = Board.instance


  useEffect(() => {
    const listener = () => {
      if (owner == "sente") {
        setCapturedFigures([...board.senteCapturedFigures]);
      }
      else {
        setCapturedFigures([...board.goteCapturedFigures]);
      }
    };

    board.subscribe(listener);

    return () => {
      board.unsubscribe(listener);
    }
  }, [board]);



  return (
    <div className={`captured-figure-area ${side}`}>
      {capturedFigures.map((figure: Figure, index) => (
        <CapturedElement key={index} figure={figure} owner={owner} />
      ))}
    </div>
  )

}

export default CapturedFiguresArea;