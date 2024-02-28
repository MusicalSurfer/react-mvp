const UserHandle = ({ user, clickUser, changeIsActive, isActive }) => {
    // Handler function to send User to active state.
    const handleClick = (e) => {
        clickUser();
        changeIsActive("3");
    }

    return (
        <>
            <li className="nav-item">
                {/* If isActive state = "3", give element active class */}
                <a className={`nav-link ${isActive === "3" ? "active" : ""}`} href="#" onClick={handleClick}>{user.userhandle}</a>
            </li>
        </>
    )
}
export default UserHandle;