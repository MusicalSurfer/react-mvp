import { useState } from 'react';
import Library from './Library.jsx';
import UserHandle from './UserHandle.jsx';
import Home from './Home.jsx';

const NavBar = ({ clickLibrary, user, clickUser, clickHome }) => {
    // State
    const [isActive, setIsActive] = useState(null);

    // Custom Functions
    // Function that sends selected item to state.
    const changeIsActive = (id) => {
        setIsActive(id);
    }

    // Render
    return (
        <div className="navBarDiv">
            <ul className="nav justify-content-left">
                <Home isActive={isActive} changeIsActive={changeIsActive} clickHome={clickHome} />
                <Library isActive={isActive} changeIsActive={changeIsActive} clickLibrary={clickLibrary} />
                <UserHandle isActive={isActive} changeIsActive={changeIsActive} user={user} clickUser={clickUser} />
            </ul>
        </div>
    )
}
export default NavBar;