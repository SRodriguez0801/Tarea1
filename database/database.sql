-- Active: 1691546315151@@127.0.0.1@5432@tarea1@public

create table
    tbl_personal (
        id serial PRIMARY key,
        nombre varchar(200),
        cargo varchar(500),
        finish BOOLEAN DEFAULT false
    );

CREATE TABLE
    tbl_lista (
        id serial PRIMARY KEY,
        nombre VARCHAR(200),
        edad INTEGER,
        fecha_ingreso DATE,
        finish BOOLEAN DEFAULT false
    );