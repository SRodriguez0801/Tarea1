const pgp = require('pg-promise')();
require('dotenv').config();

const user = process.env.USER;
const pass = process.env.PASS;
const host = process.env.HOST;
const database = process.env.DB;

const cn = `postgresql://${user}:${pass}@${host}:5432/${database}`;

const db = pgp(cn);

db.connect()
    .then(
        () => {

            console.log("Conexion Exitosa");
        }
    )
    .catch((err) => {

        console.log(`Error de Conexion ${err}`);

    });

module.exports = db;