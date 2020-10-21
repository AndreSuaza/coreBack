const express = require('express');
require('dotenv').config();
const cors = require('cors');

//Crear servidor express
const app = express();

//Configurar CORS
app.use(cors());   

//Lectrua y parseo del Body
app.use(express.json());    

//Rutas

app.use( '/api/users' , require('./routes/users'));
app.use( '/api/rols' , require('./routes/rols'));
// app.use( '/api/login' , require('./routes/auth'));


app.listen( process.env.PORT , () => { console.log ('servidor corriendo 1')} );