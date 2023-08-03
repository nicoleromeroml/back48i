const {request, response} = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarios');

const validarJWT = async (req = request, res = response, next) =>{

    const token = req.header("x-token");

    if(!token){
        return res.status(401).json({
            msg:'No hay token en la petición'
        })
    }

    try {
        
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const usuario = await Usuario.findById(uid);

        //verificar si el usuario existe
        if(!usuario){
            return res.status(401).json({
                msg:'Token no válido, usuario no existe'
            })
        }

        //verificar si el usuario está activo
        if(!usuario.estado){
            return res.status(401).json({
                msg:'Usuario inactivo'
            })
        }

        req.usuario = usuario;

        next();

    } catch (error) {
        res.status(401).json({
            msg:'Token no válido'
        })
    }
}

module.exports = {
    validarJWT
}