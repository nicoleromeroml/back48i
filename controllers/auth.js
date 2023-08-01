const {response, request} = require('express');
const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuarios');

const login = async(req = request, res = response) => {

    const {correo, password} = req.body;

    //Verificar si el correo existe
    const usuario = await Usuario.findOne({correo})

    //Verificar si el usuario está activo
    if(!usuario.estado){
        return res.status(400).json({
            msg:"Correo o password incorrectos - usuario inactivo"
        })
    }

    //Verificar la contraseña
    const contraseñaValida = bcrypt.compareSync(password, usuario.password);

    if(!contraseñaValida){
        return res.status(400).json({
            msg:"Correo o password son incorrectas"
        })
    }

    if(!usuario){
        return res.status(400).json({
            msg:"Correo o password son incorrectas"
        })
    }


    try {
        res.json({
            msg:"Login Ok",
            correo,
            password
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:"Hable con el administrador"
        })
    }

   
}

module.exports = {
    login
}