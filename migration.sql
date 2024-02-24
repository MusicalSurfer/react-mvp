DROP TABLE IF EXISTS game;
DROP TABLE IF EXISTS smoke_user;
CREATE TABLE smoke_user (
    id SERIAL PRIMARY KEY,
    userHandle TEXT,
    recent_activity TEXT
);

CREATE TABLE game (
    id SERIAL PRIMARY KEY,
    smoke_userID INTEGER REFERENCES smoke_user(id) ON DELETE CASCADE,
    name TEXT,
    genre TEXT
);