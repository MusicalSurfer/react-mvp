const GameItem = ({ game, clickGame }) => {
    const gameImgUrl = game.image_url;

    const handleClick = () => {
        clickGame(game.id);
    }

    return (
        <div className="game-card">
            <img className="game-images" src={gameImgUrl} />
            <div className="game-titles" onClick={handleClick}>{game.name}</div>
        </div>
    )
}
export default GameItem;