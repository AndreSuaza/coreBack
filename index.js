const express = require('express');
require('dotenv').config();
const cors = require('cors');

const { dbConnection } = require('./database/config');

//Crear servidor express
const app = express();

//Configurar CORS
app.use(cors());   

//Lectrua y parseo del Body
app.use(express.json());    

//DB
dbConnection();

//Rutas

app.use( '/api/users' , require('./routes/users'));
app.use( '/api/login' , require('./routes/auth'));


app.listen( process.env.PORT , () => { console.log ('servidor corriendo 1')} );