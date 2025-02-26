import {EstablishConnection,conn} from  './config/db.js'//'./src/backend/config/db.js'
import {api_check_id,
    getParameterByName,
    api_check_user_creation,
    api_cheack_event_creation,
    api_cheack_event_change,
    api_check_events_date_between,
    api_key_vlidation} from './attr_check.js'
import swaggerJsdoc  from 'swagger-jsdoc'
import express from 'express'
//let r=express.Router;
/**
 * @swagger
 * /users/?:
 *   get:
 *     summary: Получить пользователя с айди из параметра
 *     parameters:
 *       - name: id
 *         in: query
 *         required: false
 *         description: Айди пользователя
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Успешный ответ с json ответом, может быть пустым
 *       400:
 *         description: Ответ с текстом о ошибке в атрибутах
 *       500:
 *         description: Ошибка при выполнении запроса
 *
 * /events/?:
 *   get:
 *     summary: Получить ивент с айди из параметра, или по датам если будут присутствовать они
 *     parameters:
 *       - name: id
 *         in: query
 *         required: false
 *         description: Айди ивента
 *         schema:
 *           type: string
 *       - name: startDate
 *         in: query
 *         required: false
 *         description: Дата начала промежутка за который нужно искать ивенты, вид ГГГГ-ММ-ДД
 *         schema:
 *           type: string
 *       - name: endDate
 *         in: query
 *         required: false
 *         description: Дата конца промежутка за который нужно искать ивенты, вид ГГГГ-ММ-ДД
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Успешный ответ с json ответом, может быть пустым
 *       400:
 *         description: Ответ с текстом о ошибке в атрибутах
 *       500:
 *         description: Ошибка при выполнении запроса
 * /users:
 *   get:
 *     summary: Получить список всех пользователей
 *     responses:
 *       200:
 *         description: Успешный ответ с json ответом, может быть пустым
 *       500:
 *         description: Ошибка при выполнении запроса
 *   post:
 *     summary: Занести в базу нового пользователя с обязательным полем в виде email
 *     parameters:
 *       - name: name
 *         in: query
 *         required: false
 *         description: ФИО пользователя
 *         schema:
 *           type: string
 *       - name: email
 *         in: query
 *         required: true
 *         description: Эл. почта пользователя
 *         schema:
 *           type: string
 *       - name: createdAt
 *         in: query
 *         required: false
 *         description: Дата создания пользователя пользователя(ГГГГ-ММ-ДД)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ответ с текстом об удачном завершении
 *       400:
 *         description: Ответ с текстом о ошибке в атрибутах
 *       500:
 *         description: Ошибка при выполнении запроса
 * /events:
 *   get:
 *     summary: Получить список всех ивентов
 *     responses:
 *       200:
 *         description: Успешный ответ с json ответом, может быть пустым
 *       500:
 *         description: Ошибка при выполнении запроса
 *   post:
 *     summary: Занести в базу новый ивент с обязательными полями в виде создателя ивента
 *     parameters:
 *       - name: title
 *         in: query
 *         required: true
 *         description: Название ивента
 *         schema:
 *           type: string
 *       - name: description
 *         in: query
 *         required: false
 *         description: Описание ивента
 *         schema:
 *           type: string
 *       - name: date
 *         in: query
 *         required: false
 *         description: Дата проведения ивента (ГГГГ-ММ-ДД)
 *         schema:
 *           type: string
 *       - name: createdBy
 *         in: query
 *         required: true
 *         description: Айди создателя ивента
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ответ с текстом об удачном завершении
 *       400:
 *         description: Ответ с текстом о ошибке в атрибутах
 *       500:
 *         description: Ошибка при выполнении запроса
 *   put:
 *     summary: Изменить запись ивента по айди, нужны все атрибуты, даже если не меняете их
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         description: Айди ивента, что меняем
 *         schema:
 *           type: string
 *       - name: title
 *         in: query
 *         required: true
 *         description: Название ивента
 *         schema:
 *           type: string
 *       - name: description
 *         in: query
 *         required: true
 *         description: Описание ивента
 *         schema:
 *           type: string
 *       - name: date
 *         in: query
 *         required: true
 *         description: Дата проведения ивента (ГГГГ-ММ-ДД)
 *         schema:
 *           type: string
 *       - name: createdBy
 *         in: query
 *         required: true
 *         description: Айди создателя ивента
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ответ с текстом об удачном завершении
 *       400:
 *         description: Ответ с текстом о ошибке в атрибутах
 *       500:
 *         description: Ошибка при выполнении запроса
 *   delete:
 *     summary: Удалить запись по передаваемому айди
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         description: Айди ивента, что удаляем
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ответ с текстом об удачном завершении
 *       400:
 *         description: Ответ с текстом о ошибке в атрибутах
 *       500:
 *         description: Ошибка при выполнении запроса
 *
 */



function apiConfiguration(app){




    app.get("/users/?",apiGETuserById);
    app.get("/events/?",apiGETeventBy);
    app.get("/users", apiGETusers);
    app.get("/events", apiGETevents);
    app.post("/users",apiPOSTuser);
    app.post("/events",apiPOSTevent);
    app.put("/events",apiPUTevent);
    app.delete("/events",apiDELETEevent);
}

/*
function apiDOCS(request, response) {

}

 */
function apiGETuserById(request, response) {
    //let access_key=api_key_vlidation(request);
    if(api_key_vlidation(request) === undefined){
            response.status(400).send({message: 'Неправильный ключ'});
            return;
    }
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
    if(api_key_vlidation(request) === undefined){
        response.status(400).send({message: 'Неправильный ключ'});
        return;
    }
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
    if(api_key_vlidation(request) === undefined){
        response.status(400).send({message: 'Неправильный ключ'});
        return;
    }
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
    if(api_key_vlidation(request) === undefined){
        response.status(400).send({message: 'Неправильный ключ'});
        return;
    }
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
    if(api_key_vlidation(request) === undefined){
        response.status(400).send({message: 'Неправильный ключ'});
        return;
    }
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
    if(api_key_vlidation(request) === undefined){
        response.status(400).send({message: 'Неправильный ключ'});
        return;
    }
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
    if(api_key_vlidation(request) === undefined){
        response.status(400).send({message: 'Неправильный ключ'});
        return;
    }
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
    if(api_key_vlidation(request) === undefined){
        response.status(400).send({message: 'Неправильный ключ'});
        return;
    }
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