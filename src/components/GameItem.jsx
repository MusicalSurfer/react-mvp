const GameItem = ({ game, clickGame }) => {
    const gameImgUrl = game.image_url;

    // Handler that sends the game id to clickGame state.
    const handleClick = () => {
        clickGame(game.id);
    }

    // Renders game image and game title inline in the game list container
    return (
        <div className="game-card">
            <img className="game-images" src={gameImgUrl} />
            <div className="game-titles" onClick={handleClick}>{game.name}</div>
        </div>
    )
}
export default GameItem;