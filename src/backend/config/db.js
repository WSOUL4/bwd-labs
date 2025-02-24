import sequelize from 'sequelize';
import dotenv from 'dotenv';
import pg from 'pg';


dotenv.config()
const conn = new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});


function authenticate(){
    conn.query('SELECT NOW()', (err, res) => {
        if(err) {
            console.error('Error connecting to the database', err.stack);
        } else {
            console.log('Connected to the database:', res.rows);
        }
    });
}
function EstablishConnection(){
//Для чтения из .env
    //dotenv.config()
//console.log(DB_NAME);
    /*
    const DB_NAME = process.env.DB_NAME
    const DB_USER = process.env.DB_USER
    const DB_PASSWORD = process.env.DB_PASSWORD
    const DB_HOST = process.env.DB_HOST
    const DB_PORT = process.env.DB_PORT
    const conn = new sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
        dialect: "postgres",
        host: DB_HOST,
        port: DB_PORT
      });

     */
  authenticate();


    //return conn;
}
export {EstablishConnection, sequelize,conn}

