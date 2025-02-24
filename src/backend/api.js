import {EstablishConnection,conn} from  './config/db.js'//'./src/backend/config/db.js'

function apiConfiguration(app){

    app.get("/users", apiGETusers)

}

function apiGETusers(request, response) {

   //let conn=EstablishConnection();


        conn.query('SELECT name, email, "createdAt", id\n' +
            '\tFROM public."user";', function(err, results, fields) {
            console.log(err);
            //console.log(results);  // собственно данные
            response.json(results.rows);
           // console.log(fields);  // мета-данные полей
        });

        conn.end;


}

export {apiConfiguration}