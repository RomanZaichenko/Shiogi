import './styles/App.css'
import MainMenu from './game-components/MainMenu.tsx'
import GameArea from './game-components/GameArea.tsx'
import {useState} from "react";
import BoardProvider from "./game-components/BoardProvider.tsx";


function App() {
    const [gameAreaDisplay, setGameAreaDisplay] = useState(false);

  return (
    <>
      <BoardProvider>
        <MainMenu gameAreaDisplay={gameAreaDisplay} setGameAreaDisplay={setGameAreaDisplay}/>
          {gameAreaDisplay && <GameArea />}
      </BoardProvider>
    </>
  )
}

export default App
