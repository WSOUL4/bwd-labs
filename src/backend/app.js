// подключение express
//const express = require("express");
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
function apiDefault(app){

    app.get("/", function(request, response){
     
        // отправляем ответ
        response.json({msg: 'Simple msg2'})
        //response.send("<h2>Привет Express!</h2>");
    });
}
function appServerLaunch(){
// создаем объект приложения
const app = express();
app.use(cors())//middleware
app.use(express.json())//middleware
dotenv.config()//Для чтения из .env
// определяем обработчик для маршрута "/"
apiDefault(app);

// начинаем прослушивать подключения на  порту

const port = process.env.PORT;
//const port =8080;
app.listen(port, (error) => {
    if (error) throw error;
    console.info(`Сервер запустился на порте ${port}`);
  });

/*

  
  
  app.listen(port)
  .then(() => {
    console.log('Сервер запустился');
  })
  .catch(err => {
    console.error('Не удалось создать сервак', err);
  });

  
  */

}

export { appServerLaunch, apiDefault };//можно апи функцию не экспортировать она типо если из экспортируемой берётся, то взаимосвязанные хватает