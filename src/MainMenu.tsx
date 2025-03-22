import './styles/MainMenu.css'
import MenuButton from "./MenuButton.tsx";


function MainMenu() {
    return (
        <main className='menu'>
            <h1 className="menu-title">Shiogi</h1>
            <MenuButton buttonName="Play" />
            <MenuButton buttonName="Settings" />
            <MenuButton buttonName="Rules" />
            <MenuButton buttonName="Exit" />
            <MenuButton buttonName="Profile" />
        </main>

    );
}

export default MainMenu;