import './styles/MainMenu.css'
import MenuButton from "./MenuButton.tsx";
import {useEffect, useState} from "react";


function MainMenu() {
    const [hidden, setHidden] = useState(false);
    const menuElement = document.getElementById('menu');

    useEffect(() => {
        if (hidden) {
            menuElement.style.opacity = 0;
        }
        else {
            if (menuElement){
                menuElement.style.opacity = 1;
            }
        }
    })

    return (
        <main id='menu'>
            <h1 id="menu-title">Shiogi</h1>
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