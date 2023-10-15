const express = require('express');
const app = express();
require('dotenv').config();

const port = process.env.PORT;

//middleware(son funciones que se ejecutan antes de llegar a los end point )

app.use(express.json());//express ya tiene u bodiparcer para tarabajar con json
//end pont 

const tarea1 = require('./rutas/tarea1');
app.use('/api/task/', tarea1);

app.listen( port, ()=>{

    console.log(`Servidor en el puerto ${port}`);

});

//install dotenv sirve para la conexion que cada uno pueda tener sus propias credenciales