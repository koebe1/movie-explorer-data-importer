/* eslint-env node */

import DatabaseImporter from "./lib/DatabaseImporter.js";
import MovieParser from "./lib/MovieParser.js";

let dbFile = process.argv[2],
  dataPath = process.argv[3];

// callback function that gets invoked for every movie
function onMovieParsed(movie) {
  DatabaseImporter.importMovie(movie);
}

function onDatabaseReady() {
  MovieParser.setMovieParserListener(onMovieParsed);
  MovieParser.parseMoviesFrom(dataPath);
}

DatabaseImporter.prepare(dbFile, onDatabaseReady);
