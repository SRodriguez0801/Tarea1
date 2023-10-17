const express = require('express');
const app = express();
const db = require('../database/conn');

app.get('', async (req, res) => {
    let sql = `SELECT id, nombre ,edad, to_char(fecha_ingreso, 'yyyy-mm-dd')fecha_ingreso FROM tbl_lista ORDER BY id ASC`;
    const result = await db.query(sql);
    res.json(result);
});

app.post('', async (req, res) => {
    const { nombre, edad, fecha_ingreso } = req.body;
    const params = [nombre, edad, fecha_ingreso];
    let sql = `INSERT INTO tbl_lista (nombre, edad, fecha_ingreso) VALUES ($1, $2, $3) RETURNING *`;
    const result = await db.query(sql, params);
    res.json(result);
});

app.put('/:id', async (req, res) => {
    const { nombre, edad, fecha_ingreso, finish } = req.body;
    const id = req.params.id;
    const params = [nombre, edad, fecha_ingreso, id];
    let sql = `UPDATE tbl_lista 
               SET nombre = $1, edad = $2, fecha_ingreso = $3,
               WHERE id = $4
               RETURNING *`;
    const result = await db.query(sql, params);
    res.json(result);
});

app.put('/finalizarTarea/:id', async (req, res) => {
    const id = req.params.id;
    const params = [id];
    let sql = `UPDATE tbl_lista 
               SET finish = true
               WHERE id = $1
               RETURNING *`;
    const result = await db.query(sql, params);
    res.json(result);
});

app.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const params = [id];
    let sql = `DELETE FROM tbl_lista 
               WHERE id = $1
               RETURNING *`;
    const result = await db.query(sql, params);
    res.json(result);
});

module.exports = app;