const express = require('express')
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator')
const { respose, request } = require('express')
const Usuario = require("../models/usuario")

const usuariosGet = (req = request, res = respose) => {
    res.json({
        mensaje: 'soy un msj de la api usuarios FUNCIONA',
    })
    
}
const usuariosPost = async (req = request, res = respose) => {
//! validar datos
// const errors = validationResult(req);
// if(!errors.isEmpty()){
//     return res.status(400).json(errors);
// }


        // const body = req.body;
        const datos = req.body;
        const {nombre, correo, password, rol} = datos;
        const usuario = new Usuario({nombre, correo, password, rol})

//verificamos email
const existeEmail =  await Usuario.findOne({correo});
if (existeEmail){
    return res.status(400).json({
        message: "El correo ya existe"
    })
}

//encriptacion
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(password, salt);

usuario.password = hash;

//guardar en la BD
await usuario.save()

    
    res.json({
        mensaje: 'POST de usuarios',
        body

    })
}
const usuariosDelete = (req = request, res = respose) => {
    res.json({
        mensaje: 'delete de usuarios'

    })
}

const usuariosUpdate = () => {

}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosDelete,
    usuariosUpdate
}