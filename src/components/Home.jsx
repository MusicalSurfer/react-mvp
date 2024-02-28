import SmokeLogoTrans from '../assets/SmokeLogo.png';

const Home = ({ changeIsActive, isActive, clickHome }) => {
    // Handler to send Home to active state.
    const handleClick = (e) => {
        changeIsActive("1");
        clickHome();
    }

    return (
        <>
            <li className="nav-item">
                {/* If isActive state = "1", give element active class */}
                <img id="logo" src={SmokeLogoTrans} alt="Logo" className={`nav-link ${isActive === "1" ? "active" : ""}`} onClick={handleClick} />
            </li>
        </>
    )
}
export default Home;