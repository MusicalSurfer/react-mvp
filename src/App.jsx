import { useState } from 'react';
import { useEffect } from 'react';
import HomePage from './components/HomePage.jsx';
import './App.css'

//TODO: Add more games into database.
//TODO: Add pictures for each game.

function App() {
  // State
  const [games, setGames] = useState(null);
  const [singleGame, setSingleGame] = useState(null);
  const [user, setUser] = useState(null);

  // Fetch data from psql for list of games and user information
  useEffect(() => {
    const getGames = async () => {
      const res = await fetch('http://localhost:3000/api/games')
      const dataArray = await res.json();
      let gamesArray = dataArray.map(game => game);
      setGames(gamesArray);
    }

    const getUser = async () => {
      const res = await fetch(`http://localhost:3000/api/user/1`)
      const data = await res.json();
      setUser(data[0]);
    }
    getGames();
    getUser();
  }, []);

  //Custom Functions
  const addGames = (game) => {
    setGames(game);
  }
  const changeSingleGame = (game) => {
    setSingleGame(game);
  }
  // Fetch data for single game when clicked
  const clickGame = async (id) => {
    const res = await fetch(`http://localhost:3000/api/games/${id}`)
    const data = await res.json();
    changeSingleGame(data[0]);
  }
  // If user data has been fetched, display homepage. Otherwise display loading.
  return (
    <>
      {user ? <HomePage games={games} clickGame={clickGame} singleGame={singleGame} changeSingleGame={changeSingleGame} user={user} /> : <h1>Loading...</h1>}
    </>
  )
}

export default App
