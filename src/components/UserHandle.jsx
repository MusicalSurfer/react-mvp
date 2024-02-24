const UserHandle = ({ user, clickUser, changeIsActive, isActive }) => {
    const handleClick = (e) => {
        clickUser();
        changeIsActive("3");
    }

    return (
        <>
            <li className="nav-item">
                <a className={`nav-link ${isActive === "3" ? "active" : ""}`} href="#" onClick={handleClick}>{user.userhandle}</a>
            </li>
        </>
    )
}
export default UserHandle;