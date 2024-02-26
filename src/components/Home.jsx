import SmokeLogoTrans from '../assets/SmokeLogo.png';

const Home = ({ changeIsActive, isActive, clickHome }) => {
    const handleClick = (e) => {
        changeIsActive("1");
        clickHome();
    }
    return (
        <>
            <li className="nav-item">
                <img id="logo" src={SmokeLogoTrans} alt="Logo" className={`nav-link ${isActive === "1" ? "active" : ""}`} onClick={handleClick} />
            </li>
        </>
    )
}
export default Home;