import GameItem from './GameItem.jsx';

const Games = ({ games, clickGame }) => {
    return games.map((gameObj, index) => <GameItem key={index} game={gameObj} clickGame={clickGame} />)
}

export default Games;