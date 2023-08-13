const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "courses",
    password: "Bruh!091404",
    port: 5432,
}
);

module.exports = {
    query: (text, params) => {return pool.query(text,params)},
}