const mysql = require('mysql');
const { promisify } = require('util');
const database = require('../utils/env.config')
const errors = require('../utils/database.errors')

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === errors.ConnectionLost) {
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if (err.code === errors.ManyConnection) {
            console.error('DATABASE HAS TO MANY CONNECTION');
        }
        if (err.code === errors.ConnectionRefused) {
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }

    if (connection) connection.release();
    console.log('Connection successfully to MySQL');
    return;
});

//Promisify pool Querys de callbacks a promesas 
pool.query = promisify(pool.query);

module.exports = pool;
