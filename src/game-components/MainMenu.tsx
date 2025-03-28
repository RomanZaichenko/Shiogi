import '../styles/MainMenu.css'
import MenuButton from "./MenuButton.tsx";
import {useEffect, useState, useRef} from "react";

interface MainMenuProps {
    gameAreaDisplay: boolean;
    setGameAreaDisplay: (value: boolean) => void;
}


function MainMenu(props: MainMenuProps) {
    const [hidden, setHidden] = useState(false);
    const menuElement = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (menuElement.current) {
           menuElement.current.id = hidden ? "menu-hidden" : "menu-visible";
        }
    }, [hidden])

    return (
        <>
            <main id='menu' ref={menuElement}>
                <h1 id="menu-title">Shiogi</h1>
                <MenuButton buttonName={"Play"} clickHandler={() => {
                    setHidden(true);
                    props.setGameAreaDisplay(true);
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
        </>
    );
}

export default MainMenu;