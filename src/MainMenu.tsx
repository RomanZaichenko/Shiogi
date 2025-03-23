import './styles/MainMenu.css'
import MenuButton from "./MenuButton.tsx";


function MainMenu() {
    return (
        <main className='menu'>
            <h1 className="menu-title">Shiogi</h1>
            <MenuButton buttonName={"Player"}/>
            <MenuButton buttonName={"Settings"}/>
            <MenuButton buttonName={"Rules"}/>
            <MenuButton buttonName={"Profile"}/>
            <MenuButton buttonName={"Exit"}/>
        </main>

    );
}

export default MainMenu;