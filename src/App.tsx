import './styles/App.css'
import MainMenu from './MainMenu.tsx'
import GameArea from './GameArea.tsx'
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
