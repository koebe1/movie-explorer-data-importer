/* eslint-env node */

import sqlite3 from "sqlite3";

// Über diese Variable ist die Datenbank innerhalb des Moduls zugänglich
var db;

function createDatabaseSchema(callback) {
  // TODO: Erzeugen Sie hier ihr Datenbankschema in der erstellen SQLite-Datenbank
  callback();
  db.run("CREATE TABLE movies(movie_id INTEGER PRIMARY KEY)");
}
// TABLES: MOVIES, GENRES, ACTORS

// MOVIES: MOVIE_ID, TITLE, YEAR, RELEASED, RUNTIME, GENRE, DIRECTOR, WRITER
// ... ACTORS, PLOT, LANGUAGE, COUNTRY, AWARDS, POSTER, RATINGS, METASCORE, IMDBRATING,
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
    // TODO: Speichern Sie den übergebenen Film in der vorbereiteten Datenbank
  }
}

export default new DatabaseImporter();
