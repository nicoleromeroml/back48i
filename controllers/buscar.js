const {response, request } = require('express');
const Usuario = require('../models/usuarios');
const Categoria = require('../models/categoria');
const Curso = require('../models/curso');

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'cursos'
]

const buscarUsuarios = async (termino, res = response) =>{

    const regex = new RegExp(termino, "i");

    const usuarios = await Usuario.find({
        $or: [{nombre: regex}, {correo:regex}],
        $and: [{estado:true}]
    })

    res.json({
        results: usuarios
    })
}

const buscarCategorias = async(termino, res = response) =>{

    const regex = new RegExp(termino, "i");

    const categorias = await Categoria.find({
        nombre: regex,
        estado:true
    })

    res.json({
        results: categorias
    })
}

const buscarCursos = async (termino, res = response) =>{
    const regex = new RegExp(termino, "i");

    const cursos = await Curso.find({
        $or: [{nombre: regex}, {descripcion:regex}],
        $and: [{estado:true}]
    })

    res.json({
        results: cursos
    })
}

//Función principal de búsqueda
const buscar = (req = request, res = response) => {

    const {coleccion, termino} = req.params;

    //Validar coleccion
    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }

    //De acuerdo a la coleccion por el término
    switch(coleccion){
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;
        case 'categorias':
            buscarCategorias(termino, res);
            break;
        case 'cursos':
            buscarCursos(termino, res);
            break;
        default:
            res.status(500).json({
                msg: 'Hubo un error en la búsqueda'
            });
            break;
    }
}

module.exports = {
    buscar
}