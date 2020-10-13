const keys = require("./keys");
const express = require("express");
const { Pool } = require("pg");

/**
 * EXPRESS SETUP
 */

const app = express();

app.use(function (req, res, next) {
    res.header({
        "Access-Control-Allow-Origin": "*",
    });

    next();
});

app.use(express.json());

app.disable("x-powered-by");

/**
 * POSTGRES SETUP
 */

const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort,
});
pgClient.on("error", () => console.warn("Lost PG Connection"));

pgClient
    .query("CREATE TABLE IF NOT EXISTS values (number INT)")
    .catch((err) => console.error(err));
