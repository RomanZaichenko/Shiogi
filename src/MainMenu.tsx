import './styles/MainMenu.css'
import MenuButton from "./MenuButton.tsx";
import * as React from "react";


function MainMenu() {
    const [hidden, setHidden] = React.useState(false);

    return (
        <main className='menu'>
            <h1 className="menu-title">Shiogi</h1>
            <MenuButton buttonName={"Play"} clickHandler={() => {
                setHidden(true);
            }}/>
            <MenuButton buttonName={"Profile"} clickHandler={() => {
                setHidden(true);
            }}/>
            <MenuButton buttonName={"Rules"} clickHandler={() => {
                setHidden(true);
            }}/>
            <MenuButton buttonName={"Settings"} clickHandler={() => {
                setHidden(true);
            }}/>
            <MenuButton buttonName={"Exit"} clickHandler={() => {
                setHidden(true);
            }}/>
        </main>

    );
}

export default MainMenu;