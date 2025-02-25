//import './styles1.css'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import {swaggerSpec} from './src/backend/swagger.js'
import {appServerLaunch} from './src/backend/app.js'
import {EstablishConnection,conn} from './src/backend/config/db.js'
import {apiConfiguration} from './src/backend/api.js'



let app=appServerLaunch();
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec));
EstablishConnection();

//let db_conn=EstablishConnection();
apiConfiguration(app);