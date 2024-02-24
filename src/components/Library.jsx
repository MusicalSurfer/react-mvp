import Games from './Games.jsx';

const Library = ({ clickLibrary, changeIsActive, isActive }) => {
    const handleClick = (e) => {
        clickLibrary();
        changeIsActive("2");
    }
    return (
        <>
            <li className="nav-item">
                <a className={`nav-link ${isActive === "2" ? "active" : ""}`} href="#" onClick={handleClick}>Library</a>
            </li>
        </>
    )
}

export default Library;