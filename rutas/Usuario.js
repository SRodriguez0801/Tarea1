const express = require('express');
const app = express();
const db = require('../database/conn');
const Correo = require ('../Correos/Correo');


app.post('', async (req, res) => {

    let params = [

        req.body.correo,
        req.body.contrasenia
    ]

    let sql = `
            select correo, nombre, id_rol from tbl_usuarios 
                where estado = true
                and correo = $1
                and contrasenia = $2

    `;
    const result = await db.query(sql, params);

    if (result.length > 0) {
        res.json(result);
    } else {
        res.status(404).json({ mensaje: "Usuario  invalido" });
    }



});

//para crea usuario 

app.post('/User/', async (req, res) => {

    let params = [

        req.body.correo,
        req.body.contrasenia,
        req.body.nombre,
        req.body.apellido,
        2
    ]

    let sql = `
    insert into tbl_usuarios 
    (correo,contrasenia, nombre,apellido, id_rol )
    values 
    ($1,$2, $3, $4, $5 )
    returning *

    `;
//notificacion de correo electronico 
    try {
        const result = await db.query(sql, params);

        const emailData = {
            to : result[0].correo,
            name : result[0].nombre

        }
      
        Correo.correoDeBienvenida(emailData );
        res.json(result); 
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }

});

module.exports = app;