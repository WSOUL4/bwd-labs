//import './styles1.css'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import {appServerLaunch} from './src/backend/app.js'
import {EstablishConnection} from './src/backend/config/db.js'

appServerLaunch();
EstablishConnection();