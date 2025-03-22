import './styles/MainMenu.css'


function MainMenu() {
    return (
        <main className='menu'>
            <h1 id="menu-header">Shiogi</h1>
            <button className="menu-button">Play</button>
            <button className="menu-button">Settings</button>
            <button className="menu-button">Rules</button>
            <button className="menu-button">Exit</button>
            <button className="menu-button">Profile</button>
        </main>

    );
}

export default MainMenu;