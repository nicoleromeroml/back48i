const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuarios');
const { generarJWT } = require('../helpers/generar-jwt');

//*Creamos la función que recibía como parámetro al res y req
const login = async (req = request, res = response) => {

    //*del cuerpo de la petición obtenemos el correo y el password
    const { correo, password } = req.body;

    try {

        //1.Verificar si el correo existe

        const usuario = await Usuario.findOne({correo})

        if(!usuario){
            //*Al ser un error del usuario le pasamos el error 400
            return res.status(400).json({
                msg:"Correo o password incorrectos"
            })
        }

        //2.Verificar si el usuario está activo
        if(!usuario.estado){
            return res.status(400).json({
                msg:"Correo o password incorrectos | Usuario inactivo"
            })
        }

        //3.Verificar la contraseña
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if(!validPassword){
            return res.status(400).json({
                msg:"Correo o password incorrectos"
            })
        }

        //4.Generar el token
        const token = await generarJWT(usuario.id);


        res.json({
            msg: "Login OK",
            token,
            usuario
            // correo,
            // password
        });

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            msg: "Hable con el administrador"
        })
    }

}


module.exports = {
    login
}