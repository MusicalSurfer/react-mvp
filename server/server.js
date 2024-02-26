import express from 'express';
import cors from 'cors';
import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
console.log('App is starting');
let PORT = process.env.PORT || 8000;
const Pool = pkg.Pool;
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    }
})
pool.connect()
    .then(() => {
        console.log('Connected to database');
    })
    .catch((err) => {
        console.error(err);
    })

const app = express();
// Middleware
app.use(
    express.json(),
    express.static('dist'),
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
        allowedHeaders: ['Authorization', 'Content-Type']
    })
);

// Get request to list all games
app.get('/api/games', (req, res, next) => {
    pool.query('SELECT * FROM game')
        .then((data) => {
            if (data.rows.length === 0) {
                res.status(404).send('Games not found');
            }
            res.status(200).send(data.rows);
        })
        .catch(next)
});

// Get request to list one game by id
app.get('/api/games/:gameID', (req, res, next) => {
    const gameID = Number(req.params.gameID)
    pool.query('SELECT * FROM game WHERE id = $1', [gameID])
        .then((data) => {
            if (data.rows.length === 0) {
                res.status(404).send('Games not found');
            }
            res.status(200).send(data.rows);
        })
        .catch(next)
});

// Get request to list one user by id
app.get('/api/user/:userID', (req, res, next) => {
    const userID = Number(req.params.userID)
    pool.query('SELECT * FROM smoke_user WHERE id = $1', [userID])
        .then((data) => {
            if (data.rows.length === 0) {
                res.status(404).send('User not found');
            }
            res.status(200).send(data.rows);
        })
        .catch(next)
});

// Use next middleware to pass errors.
app.use((err, req, res, next) => {
    console.log(err);
    res.sendStatus(500);
})

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
})