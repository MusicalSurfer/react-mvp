DROP TABLE IF EXISTS game;
DROP TABLE IF EXISTS library;
CREATE TABLE library (
    id SERIAL PRIMARY KEY,
    userHandle TEXT
);
CREATE TABLE game (
    id SERIAL PRIMARY KEY,
    libraryID INTEGER REFERENCES library(id) ON DELETE CASCADE,
    name TEXT,
    genre TEXT
);