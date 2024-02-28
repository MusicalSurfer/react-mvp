const SingleGame = ({ singleGame }) => {
    // Handler for displaying a install message when install button is clicked.
    const handleClick = (e) => {
        alert("Installing game...");
    }

    // Renders Banner game image with install button, and game info below.
    return (
        <div className="single-game-container">
            <img className="single-game-image" src={singleGame.image_url} alt="Game" />
            <div className="card">
                <button type="button" className="btn btn-primary" onClick={handleClick}>Install</button>
                <div className="single-game-details-item">Genre: {singleGame.genre}</div>
                <div id="timePlayed" className="single-game-details-item">Time Played: {singleGame.time_played}</div>
            </div>
        </div>
    )
}
export default SingleGame;