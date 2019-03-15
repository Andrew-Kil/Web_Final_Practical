const pgp = require("pg-promise")({});
const connectionString = "postgres://localhost:5432/movie_app";
const db = pgp(connectionString);

module.exports = { db };
