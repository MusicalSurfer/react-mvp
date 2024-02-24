const GameItem = ({ game, clickGame }) => {
    const handleClick = () => {
        clickGame(game.id);
    }

    return (
        <li className="list-group-item" onClick={handleClick}>{game.name}</li>
    )
}
export default GameItem;