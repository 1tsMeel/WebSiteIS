const mysql = require('mysql');
const { promisify } = require('util');
const { database } = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('DATABASE CONNECTION WAS CLOSE');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.log('Database has to manu connections')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('database connection was refused');
        }
    }

    if (connection) connection.release(); //create a connection
    console.log('DB is connected');
    return;
});

//promisify pool query
pool.query = promisify(pool.query);

module.exports = pool; //return the conection 