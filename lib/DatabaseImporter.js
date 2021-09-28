/* eslint-env node */

import sqlite3 from "sqlite3";

// Über diese Variable ist die Datenbank innerhalb des Moduls zugänglich
var db;

function createDatabaseSchema(callback) {
  // TODO: Erzeugen Sie hier ihr Datenbankschema in der erstellen SQLite-Datenbank

  db.run(
    `CREATE TABLE IF NOT EXISTS movies
    (movie_id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, year INTEGER, released TEXT,
      runtime TEXT, genre TEXT, director TEXT, writer TEXT, actors TEXT, plot TEXT,
      language TEXT, country TEXT, awards TEXT, poster TEXT, internet_movie_database TEXT,
      rotten_tomatoes TEXT, metacritic TEXT, metascore INTEGER, imdbRating REAL,
      imdbVotes TEXT, imdID TEXT, type TEXT, dvd TEXT, boxOffice TEXT, production TEXT,
      website TEXT, response TEXT)`
  );

  db.run(
    "CREATE TABLE IF NOT EXISTS genres (genre_id INTEGER PRIMARY KEY, name TEXT, UNIQUE(name))"
  );

  db.run(
    "CREATE TABLE IF NOT EXISTS actors(actors_id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT, last_name TEXT)"
  );

  callback();
}
// TABLES: MOVIES, GENRES, ACTORS

// MOVIES: MOVIE_ID, TITLE, YEAR, RELEASED, RUNTIME, GENRE, DIRECTOR, WRITER
// ... ACTORS, PLOT, LANGUAGE, COUNTRY, AWARDS, POSTER,
//  INTERNET_MOVIE_DATABASE, ROTTEN_TOMATOES, METACRITIC, METASCORE, IMDBRATING,
// IMDBVOTES, IMDBID, TYPE, DVD, BOXOFFICE, PRODUCTION, WEBSITE, RESPONSE

// GENRES: GENRE_ID, NAME
// ACTORS: ACTOR_ID, FIRST_NAME, LAST_NAME

class DatabaseImporter {
  prepare(dbPath, callback) {
    db = new sqlite3.Database(dbPath, function(err) {
      // log error if something wrong with creating the database
      if (err) {
        return console.log(err.message);
      }
      createDatabaseSchema(callback);
      console.log("Connected to the in-memory SQlite database.");
    });
    db.close(() => {
      console.log("Database closed!");
    });
  }

  importMovie(movie) {
    console.log(`Importing movie "${movie.title}" ...`);

    // GENRES
    db.run(
      `INSERT OR IGNORE INTO  "genres" (name)
        VALUES (?)`,
      [movie.genre],
      function(err) {
        if (err) {
          console.log(err.message);
        }
      }
    );

    //  ACTORS
    // db.run(
    //   `INSERT OR IGNORE INTO  "actors" (name)
    //     VALUES (?)`,
    //   [movie.genre],
    //   function(err) {
    //     if (err) {
    //       console.log(err.message);
    //     }
    //   }
    // );

    // MOVIES
    // db.run(
    //   `INSERT OR IGNORE INTO  "movies" (name)
    //     VALUES (?)`,
    //   [movie.genre],
    //   function(err) {
    //     if (err) {
    //       console.log(err.message);
    //     }
    //   }
    // );
  }
}

export default new DatabaseImporter();
