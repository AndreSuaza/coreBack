const express = require('express');
require('dotenv').config();
const cors = require('cors')

const { dbConnection } = require('./database/config');

//Crear servidor express
const app = express();

//Configurar CORS
app.use(cors());        

//DB
dbConnection();

//Rutas
app.get('/', (req, res) => {

    res.json({
        ok: true,
        msg: 'holamundo'
    });

}  );

app.listen( process.env.PORT , () => { console.log ('servidor corriendo 1')} );