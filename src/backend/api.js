import {EstablishConnection,conn} from  './config/db.js'//'./src/backend/config/db.js'
import {api_check_id,getParameterByName,api_check_user_creation} from './attr_check.js'




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
    let id=api_check_id(request);
    if (id){
    /*
    request.json().then((data) => {
        console.log(data);
    });
     */
    conn.query(`SELECT name, email, "createdAt", id FROM public."user" WHERE id=${id}`,
        function(err, results, fields) {
        if (err){
            console.log(err);
            response.json(err,"Ошибка запроса");
        }else{
            response.json(results.rows);}

    });

    conn.end;} else {
        response.json("Ошибка в значении паарметра");
    }

}
function apiGETeventById(request, response) {
    let id=api_check_id(request);
    if (id){
        conn.query(`SELECT title, description, date, "createdBy", id FROM public.event WHERE id=${id}`,
            function(err, results, fields) {
                if (err){
                    console.log(err);
                    response.json(err,"Ошибка запроса");
                }else{
                    response.json(results.rows);}

            });

        conn.end;
    } else {
        response.json("Ошибка в значении паарметра");
    }
}

function apiPOSTuser(request, response) {
let params= api_check_user_creation(request);
//console.log(params);
if (params){
    conn.query(`INSERT INTO public."user"(name, email, "createdAt")\n`+
        `VALUES ('${params.name}', '${params.email}', '${params.createdAt}');`,
        function(err, results, fields) {
            if (err){
                console.log(err);
                response.json(err,"Ошибка запроса");
            }else{
                response.json('Удачно добавлен!');}

        });

    conn.end;
}else {
    response.json("Ошибка в значении паарметра, или нехватает email");
}
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