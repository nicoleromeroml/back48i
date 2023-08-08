const Rol = require('../models/rol');
const Usuario = require('../models/usuarios');
const Categoria = require('../models/categoria');
const Curso = require('../models/curso');

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

const usuarioExiste = async(id) =>{
    const existeUsuario = await Usuario.findById(id);

    if(!existeUsuario) throw new Error(`El id ${id} no corresponde a ningún usuario registrado`);
}

const categoriaExiste = async (id) =>{

    //*Si no encuentra nada nos va a devolver un undefined
    const existeCategoria = await Categoria.findById(id);

    //*Entonces si no existe tal id, le pasamos el error
    if(!existeCategoria) throw new Error(`El id ${id} no corresponde a ninguna categoría registrada`);
}

const cursoExiste = async (id) =>{

    //*Si no encuentra nada nos va a devolver un undefined
    const existeCurso = await Curso.findById(id);

    //*Entonces si no existe tal id, le pasamos el error
    if(!existeCurso) throw new Error(`El id ${id} no corresponde a ningun curso registrado`);
}

module.exports = {
    esRolValido,
    emailExiste,
    usuarioExiste,
    categoriaExiste,
    cursoExiste
}