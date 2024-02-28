const Library = ({ clickLibrary, changeIsActive, isActive }) => {
    // Handler function to send library to active state
    const handleClick = (e) => {
        clickLibrary();
        changeIsActive("2");
    }

    return (
        <>
            <li className="nav-item">
                {/* {/* If isActive state = "2", give element active class */}
                <a className={`nav-link ${isActive === "2" ? "active" : ""}`} href="#" onClick={handleClick}>Library</a>
            </li>
        </>
    )
}

export default Library;