import {EstablishConnection,conn} from  './config/db.js'//'./src/backend/config/db.js'
import {api_check_id,getParameterByName,api_check_user_creation,api_cheack_event_creation,api_cheack_event_change,api_check_events_date_between} from './attr_check.js'




function apiConfiguration(app){


    app.get("/users?",apiGETuserById);
    app.get("/events?",apiGETeventBy);
    app.get("/users", apiGETusers);
    app.get("/events", apiGETevents);
    app.post("/users",apiPOSTuser);
    app.post("/events",apiPOSTevent);
    app.put("/events",apiPUTevent);
    app.delete("/events",apiDELETEevent);
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
            //response.json(err,"Ошибка запроса");
            response.status(500).send({
                message: 'Ошибка запроса'
            });
        }else{

            //response.json(results.rows);
            response.status(200).json(results.rows);
        }

    });

    conn.end;} else {
        //response.json("Ошибка в значении парметра");
        response.status(400).send({
            message: 'Ошибка в значении парметра!'
        });
    }

}
function apiGETeventBy(request, response) {
    let id=api_check_id(request);
    let dates=api_check_events_date_between(request);
    if (dates){

        conn.query(`SELECT title, description, date, "createdBy", id\n` +
            `FROM public.event\n`+
            `WHERE date BETWEEN '${dates.startDate}' and '${dates.endDate}';`, function(err, results, fields) {
            if (err){
                console.log(err);
                response.status(500).send({message: 'Ошибка запроса'});
            }else{
                //response.json(results.rows);
                response.status(200).json(results.rows);
            }
        });
    } else if (id){
        conn.query(`SELECT title, description, date, "createdBy", id FROM public.event WHERE id=${id}`,
            function(err, results, fields) {
                if (err){
                    console.log(err);
                    response.status(500).send({message: 'Ошибка запроса'});
                }else{
                    //response.json(results.rows);
                    response.status(200).json(results.rows);
                }

            });


    } else {

        response.status(400).send({message: 'Ошибка в параметрах запроса'});
    }
    conn.end;
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
                response.status(500).send({message: 'Ошибка запроса'});
            }else{
                //response.json('Удачно добавлен!');
                response.status(200).send({message: 'Удачно добавлен!'});
            }

        });

    conn.end;
}else {

    response.status(400).send({message: 'Ошибка в значении паарметра, или нехватает email'});

}

}
function apiPOSTevent(request, response) {
    let params = api_cheack_event_creation(request);
    if (params){
        conn.query(`insert into public.event( \n`+
            `title, description, date, "createdBy")\n`+
            ` VALUES ('${params.title}', '${params.description}', '${params.date}', '${params.createdBy}')`,
            function(err, results, fields) {
                if (err){
                    console.log(err);
                    response.status(500).send({message: 'Ошибка запроса'});
                }else{
                    response.status(200).send({message: 'Удачно добавлен!'});
                }
    });
    } else {

        response.status(400).send({message: 'Ошибка в параметрах запроса'});
    }
}

function apiPUTevent(request, response) {
    let params = api_cheack_event_change(request);
    if (params){
        conn.query(`UPDATE public.event
\tSET title='${params.title}', description='${params.description}', date='${params.date}', "createdBy"='${params.createdBy}'
\tWHERE id=${params.id};`,
            function(err, results, fields) {
                if (err){
                    console.log(err);
                    response.status(500).send({message: 'Ошибка запроса'});
                }else{
                    response.status(200).send({message: 'Удачно изменён!'});
                }
            });
    } else {

        response.status(400).send({message: 'Ошибка в параметрах запроса'});
    }
}
function apiDELETEevent(request, response) {
let params=api_check_id(request);
if (params){
    conn.query(`DELETE FROM public.event WHERE id=${params};`,
        function(err, results, fields) {
            if (err){
                console.log(err);
                response.status(500).send({message: 'Ошибка запроса'});
            }else{
                response.status(200).send({message: 'Удачно уничтожен!'});}
        });
}else {

    response.status(400).send({message: 'Ошибка в параметрах запроса'});
}
}

function apiGETusers(request, response) {

   //let conn=EstablishConnection();


        conn.query('SELECT name, email, "createdAt", id\n' +
            '\tFROM public."user";', function(err, results, fields) {

            //console.log(results);  // собственно данные
            if (err){
                console.log(err);
                response.status(500).send({message: 'Ошибка запроса'});
            }else{
                response.status(200).json(results.rows);
            }
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
            response.status(500).send({message: 'Ошибка запроса'});
        }else{
            response.status(200).json(results.rows);
        }
        // console.log(fields);  // мета-данные полей
    });

    conn.end;
}

export {apiConfiguration}