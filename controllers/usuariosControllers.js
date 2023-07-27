const {response, request} = require('express');
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs'); //Importar librería para encriptar contraseña
const Usuario = require ('../models/usuarios');

const usersGet = async (req = request, res = response) =>{

    const {desde, limite} = req.query;
    const query = {estado:true};

    // const {apiKey, limit} = req.query;
    // const usuarios = await Usuario.find().skip(desde).limit(limite);

    // const total = await Usuario.countDocuments();

    const [usuarios, total] = await Promise.all([
        Usuario.find(query).skip(desde).limit(limite),
        Usuario.countDocuments(query),
    ])

    res.json({
        total,
        usuarios
    
        // message: "Get users",
        // apiKey,
        // limit
    })
}

const usersPost = async (req = request, res = response) =>{
    //!validar los errores
    // const errors = validationResult(req);
    // if(!errors.isEmpty()){
    //     return res.status(400).json(errors);
    // }
 
    //!recibir el cuerpo de la peticion
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

const usersPut = async (req = request, res = response) =>{

    //Traemos el id
    const {id} = req.params;

    //Obtener los datos a actualizar
    const {password, correo, ...resto} = req.body;

    //Si actualizo la password debemo encriptarla
    if(password){
        const salt = bcrypt.genSaltSync(10);
        resto.password = bcrypt.hashSync(password, salt);
    }
    
    //Buscar el usuario y actualizarlo
    const usuario = await Usuario.findByIdAndUpdate(id, resto, {new:true});

    res.json({
        message: "Put users",
        usuario,
    })
}

const usersDelete = async(req = request, res = response) =>{
    const {id} = req.params;

    // const usarioBorrado = await Usuario.findByIdAndDelete(id);
    // const usuario = await Usuario.findById(id);
    // if(!usuario.estado){
    //     return res.json({
    //         msg: "El usuario ya está inactivo"
    //     })
    // }

    const usuarioInactivado = await Usuario.findByIdAndUpdate(id, {estado:false}, {new:true});

    res.json({
        message: "Usuario Inactivo",
        // usarioBorrado
        usuarioInactivado
        })
}

module.exports = {usersGet, usersPost, usersPut, usersDelete};