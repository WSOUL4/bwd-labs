import {EstablishConnection,conn} from  './config/db.js'//'./src/backend/config/db.js'

function getParameterByName(name, url) {
    name = name.replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}



function apiConfiguration(app){


    app.get("/users?",apiGETuserById);
    app.get("/events?",apiGETeventById);
    app.get("/users", apiGETusers);
    app.get("/events", apiGETevents);
    app.post("/users",apiPOSTuser);
    app.post("/events",apiPOSTevent);
    app.put("/events/",apiPUTevent);
    app.delete("/events/",apiDELETEevent);
}



function apiGETuserById(request, response) {
    console.log(getParameterByName('id',request.url));
    response.json('got it');
    /*
    request.json().then((data) => {
        console.log(data);
    });

     */


}
function apiGETeventById(request, response) {

}

function apiPOSTuser(request, response) {

}
function apiPOSTevent(request, response) {

}

function apiPUTevent(request, response) {

}
function apiDELETEevent(request, response) {

}

function apiGETusers(request, response) {

   //let conn=EstablishConnection();


        conn.query('SELECT name, email, "createdAt", id\n' +
            '\tFROM public."user";', function(err, results, fields) {

            //console.log(results);  // собственно данные
            if (err){
                console.log(err);
                response.json(err,"Ошибка запроса");
            }else{
            response.json(results.rows);}
           // console.log(fields);  // мета-данные полей
        });

        conn.end;


}
function apiGETevents(request, response) {
    conn.query('SELECT title, description, date, "createdBy", id\n'+
   'FROM public.event;', function(err, results, fields) {

        //console.log(results);  // собственно данные
        if (err){
            console.log(err);
            response.json(err,"Ошибка запроса");
        }else{
            response.json(results.rows);}
        // console.log(fields);  // мета-данные полей
    });

    conn.end;
}

export {apiConfiguration}