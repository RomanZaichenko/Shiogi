import './styles/App.css'
import MainMenu from './game-components/MainMenu.tsx'
import GameArea from './game-components/GameArea.tsx'
import {useState} from "react";


function App() {
    const [gameAreaDisplay, setGameAreaDisplay] = useState(false);

  return (
    <>
      <MainMenu gameAreaDisplay={gameAreaDisplay} setGameAreaDisplay={setGameAreaDisplay}/>
        {gameAreaDisplay && <GameArea />}
    </>
  )
}

export default App
