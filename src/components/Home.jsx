const Home = ({ changeIsActive, isActive, clickHome }) => {
    const handleClick = (e) => {
        changeIsActive("1");
        clickHome();
    }
    return (
        <>
            <li className="nav-item">
                <a href="#" className={`nav-link ${isActive === "1" ? "active" : ""}`} onClick={handleClick}>Home</a>
            </li>
        </>
    )
}
export default Home;