const Rol = require('../models/rol');
const Usuario = require('../models/usuarios');
//Validar Rol
const esRolValido = async (rol) => {

    const existeRol = await Rol.findOne({rol})

    if(!existeRol){

        throw new Error(`El rol ${rol} no existe en la base de datos`);
    }
};

//Validar mail
const emailExiste = async(correo) => {
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error(`El correo ${correo} ya se encuentra registrado`);
    }
}

const usuarioExiste = async() =>{
    const existeUsario = await Usario.findById(id);

    if(!existeUsuario) throw new Error(`El id ${id} no corresponde a ningún usuario registrado`);
}

module.exports = {
    esRolValido,
    emailExiste,
    usuarioExiste
}