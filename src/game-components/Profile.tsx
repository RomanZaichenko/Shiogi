import MenuButton from "./MenuButton";
import "../styles/Profile.css"
import "../styles/MenuButton.css"


interface ProfileProps {
  setGameStage: (stage: "menu" | "game" | "gameOver" | "profile") => void;
}

function Profile({setGameStage}: ProfileProps) {
  const wins = parseInt(localStorage.getItem("wins") || "0", 10);
  const loses = parseInt(localStorage.getItem("loses") || "0", 10);

  return (
    <div className="profile">
      <h2 className="profile-subtitle">{`Wins: ${wins}`}</h2>
      <h2 className="profile-subtitle">{`Loses: ${loses}`}</h2>
      <MenuButton buttonName={"Return"} clickHandler={() => setGameStage("menu")} />
    </div>
  );
}


export default Profile;