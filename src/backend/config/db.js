import sequelize from 'sequelize';
import dotenv from 'dotenv';


function EstablishConnection(){
dotenv.config()//Для чтения из .env
const DB_NAME = process.env.DB_NAME
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_HOST = process.env.DB_HOST
const DB_PORT = process.env.DB_PORT
//console.log(DB_NAME);
const conn = new sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    dialect: "postgres",
    host: DB_HOST,
    //port: DB_PORT
  });

  conn.authenticate()
  .then(() => {
    console.log('Соединение с БД успешно установлено.');
  })
  .catch(err => {
    console.error('Не удалось подключиться к БД:', err);
  });

}
export {EstablishConnection, sequelize}

