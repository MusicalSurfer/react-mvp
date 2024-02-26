const SingleGame = ({ singleGame }) => {
    const handleClick = (e) => {
        alert("Installing game...");
    }

    return (
        <div className="single-game-container">
            <img className="single-game-image" src={singleGame.image_url} alt="Game" />
            <div className="card">
                <button type="button" className="btn btn-primary" onClick={handleClick}>Install</button>
                <div className="single-game-details-item">Genre: {singleGame.genre}</div>
            </div>
        </div>
    )
}
export default SingleGame;