import { useState } from 'react';
import NavBar from './NavBar.jsx';
import Games from './Games.jsx';
import SingleGame from './SingleGame.jsx';
import Profile from './Profile.jsx';

const HomePage = ({ games, clickGame, singleGame, changeSingleGame, user }) => {
    // State to store what navbar has been clicked.
    const [isLibraryClicked, setIsLibraryClicked] = useState(false);
    const [isUserClicked, setIsUserClicked] = useState(false);
    const [isHomeClicked, setIsHomeClicked] = useState(false);

    // Helper function that changes if library is clicked to true, wipes SingleGame state, and sets isUserClicked to false.
    const clickLibrary = () => {
        setIsLibraryClicked(true);
        changeSingleGame(null); // Wipe singleGame state to go back to library
        setIsUserClicked(false);
        setIsHomeClicked(false);
    }

    // Helper function that sets isUserClicked to true and sets isLibraryClicked to false.
    const clickUser = () => {
        setIsUserClicked(true);
        setIsLibraryClicked(false)
        setIsHomeClicked(false);
    }

    // Helper function that sets isHomeClicked to true and sets others to false.
    const clickHome = () => {
        setIsHomeClicked(true);
        setIsLibraryClicked(false)
        setIsUserClicked(false)
    }

    // Checks to see what navbar item has been clicked and renders that page.
    if (isLibraryClicked) {
        // If library is clicked and a game is selected, display single game page otherwise just display library.
        if (singleGame) {
            return (
                <>
                    <NavBar clickLibrary={clickLibrary} user={user} clickUser={clickUser} clickHome={clickHome} />
                    <div className="single-game-master-container">
                        <div className="game-list">
                            <Games games={games} clickGame={clickGame} />
                        </div>
                        <SingleGame singleGame={singleGame} />
                    </div>
                </>
            )
        }
        return (
            <>
                <NavBar clickLibrary={clickLibrary} user={user} clickUser={clickUser} clickHome={clickHome} />
                <div className="game-list">
                    <Games games={games} clickGame={clickGame} />
                </div>
            </>
        )
    }
    // Displays Profile page
    else if (isUserClicked) {
        return (
            <>
                <NavBar clickLibrary={clickLibrary} user={user} clickUser={clickUser} clickHome={clickHome} />
                <Profile user={user} />
            </>
        )
    }
    // Display Home page
    else {
        return (
            <>
                <NavBar clickLibrary={clickLibrary} user={user} clickUser={clickUser} clickHome={clickHome} />
                <h3 style={{ fontSize: "3rem", textAlign: "center" }} id="welcome-message">Welcome to Smoke!</h3>
            </>
        )
    }
}
export default HomePage;