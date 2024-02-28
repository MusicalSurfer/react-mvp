import express from 'express';
import cors from 'cors';
import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
console.log('App is starting');

// PG pool creation
let PORT = process.env.PORT || 8000;
const Pool = pkg.Pool;
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    }
})

// If database successfully connects, log message, otherwise log error.
pool.connect()
    .then(() => {
        console.log('Connected to database');
    })
    .catch((err) => {
        console.error(err);
    })

const app = express(); // Express app creation

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

// Get request to list all users
app.get('/api/user', (req, res, next) => {
    pool.query('SELECT * FROM smoke_user')
        .then((data) => {
            if (data.rows.length === 0) {
                res.status(404).send('Users not found');
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

// Patch request to update a game.
app.patch('/api/games/:gameID', (req, res, next) => {
    const gameID = Number(req.params.gameID)
    const { name, genre, image_url, time_played } = req.body;
    let smoke_userID = req.body.smoke_userid;
    if (smoke_userID) {
        smoke_userID = Number(smoke_userID);
    }

    pool.query(
        `UPDATE game SET 
            smoke_userid = COALESCE($1, smoke_userid),
            name = COALESCE($2, name),
            genre = COALESCE($3, genre),
            image_url = COALESCE($4, image_url),
            time_played = COALESCE($5, time_played)
        WHERE id = $6 RETURNING *`,
        [smoke_userID, name, genre, image_url, time_played, gameID])
        .then((data) => {
            if (data.rows.length === 0) {
                res.sendStatus(404);
                return;
            }
            res.status(200).json({ message: 'Game updated successfully.' });
        })
        .catch(next)
})

// Patch request to update a user.
app.patch('/api/user/:userID', (req, res, next) => {
    const userID = Number(req.params.userID)
    const { userhandle, recent_activity } = req.body;
    let level = req.body.level
    if (level) {
        level = Number(level);
    }

    pool.query(
        `UPDATE smoke_user SET 
            userhandle = COALESCE($1, userhandle),
            recent_activity = COALESCE($2, recent_activity),
            level = COALESCE($3, level)
        WHERE id = $4 RETURNING *`,
        [userhandle, recent_activity, level, userID])
        .then((data) => {
            if (data.rows.length === 0) {
                res.sendStatus(404);
                return;
            }
            res.status(200).json({ message: 'Smoke_User updated successfully.' });
        })
        .catch(next)
})

// Delete request to delete a game.
app.delete('/api/games/:gameID', (req, res, next) => {
    const gameID = Number(req.params.gameID);

    if (isNaN(gameID)) {
        res.status(400).json({ message: 'Not Found' })
        return;
    }

    pool.query('DELETE FROM game WHERE id = $1', [gameID])
        .then(() => {
            res.status(200).json({ message: 'Game deleted successfully' });
        })
        .catch(next)
});

// Delete request to delete a user.
app.delete('/api/user/:userID', (req, res, next) => {
    const userID = Number(req.params.userID);

    if (isNaN(userID)) {
        res.status(400).json({ message: 'Not Found' })
        return;
    }

    pool.query('DELETE FROM smoke_user WHERE id = $1', [userID])
        .then(() => {
            res.status(200).json({ message: 'User deleted successfully' });
        })
        .catch(next)
});

// Post request to create a game
app.post('/api/games', (req, res, next) => {
    const { name, genre, image_url, time_played } = req.body;
    const smoke_userID = Number(req.body.smoke_userid);

    pool.query('INSERT INTO game (smoke_userid, name, genre, image_url, time_played) VALUES ($1, $2, $3, $4, $5)', [smoke_userID, name, genre, image_url, time_played])
        .then(() => {
            res.status(200).json({ message: 'Game created successfully.' })
        })
        .catch(next)
});

// Post request to create a user
app.post('/api/user', (req, res, next) => {
    const { userhandle, recent_activity } = req.body;
    let level = req.body.level
    if (level) {
        level = Number(level);
    }

    pool.query('INSERT INTO smoke_user (userhandle, recent_activity, level) VALUES ($1, $2, $3)', [userhandle, recent_activity, level])
        .then(() => {
            res.status(200).json({ message: 'User created successfully.' })
        })
        .catch(next)
});

// Use next middleware to pass errors.
app.use((err, req, res, next) => {
    console.log(err);
    res.sendStatus(500);
})

// Server listening function
app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
})