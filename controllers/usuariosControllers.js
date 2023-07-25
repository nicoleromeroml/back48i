const {response, request} = require('express');
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs'); //Importar librería para encriptar contraseña
const Usuario = require ('../models/usuarios');

const usersGet = (req = request, res = response) =>{

    const {apiKey, limit} = req.query;

    res.json({
        message: "Get users",
        apiKey,
        limit
    })
}

const usersPost = async (req = request, res = response) =>{
    //!validar los errores
    // const errors = validationResult(req);
    // if(!errors.isEmpty()){
    //     return res.status(400).json(errors);
    // }
    //*Si error no está vacío quiere decir que no hay errores, entonces hay que detener el proceso
    //* devolvemos la respuesta con un status 400 y que devuelva en un json los errores


    const datos = req.body;

    const {nombre, correo, password, rol} = datos;

    const usuario = new Usuario({nombre, correo, password, rol});

    //!verificar el correo
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        return res.status(400).json({
            msg:"El correo ya existe"
        });
    }
    //*Si nos devolvió algún dato con ese correo entonces hacemos un return(corta el proceso)
    //*Si existe un correo como el que el usuario intenta guardar entonces está mal, el usuario ya existe
    //*Como es un error del usuario el servidor le tiene que devolver un mensaje con status


    //!encriptar la contraseña
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    usuario.password = hash;

    //guardar en la BD
    await usuario.save();

    res.json({
        usuario,
        msg: "Usuario creado correctamente"
    });
}

const usersPut = (req = request, res = response) =>{
    res.json({
        message: "Put users",
    })
}

const usersDelete = (req = request, res = response) =>{
    res.json({
        message: "Delete users",
    })
}

module.exports = {usersGet, usersPost, usersPut, usersDelete};