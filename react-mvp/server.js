import express from 'express';
import cors from 'cors';
import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
console.log('App is starting');
const Pool = pkg.Pool;
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
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
app.use(express.json());

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Authorization', 'Content-Type']
}));



// Use next middleware to pass errors.
app.use((err, req, res, next) => {
    console.log(err);
    res.sendStatus(500);
})

app.listen(8000, () => {
    console.log('Listening on port ' + 8000);
})