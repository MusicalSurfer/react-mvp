import GameItem from './GameItem.jsx';

// Loops through and displays a list of games from db
const Games = ({ games, clickGame }) => {
    return games.map((gameObj, index) => <GameItem key={index} game={gameObj} clickGame={clickGame} />)
}

export default Games;