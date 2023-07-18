require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require("path");
const app = express();
const {json} = require('body-parser');

//Requerir router
const router = require('./routes/index.routes');

//Settings
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extend:false}));
app.use(json());;

//Rutas
app.use('/', router);

// Ruta publica
app.use(express.static('./GBG-data/images'));

app.use((req, res, next) => {
  res.status(404).json({
    status: '404',
    descripcion: 'Pagina no encontrada'
  })
})
  
module.exports = app;