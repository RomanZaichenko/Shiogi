
interface MenuButtonProps {
    buttonName: string;
}

function MenuButton({ buttonName }: MenuButtonProps) {
    return (
        <button className="menu-button">{buttonName}</button>
    );
}

export default MenuButton;