const {response, request} = require('express');
const Categoria = require('../models/categoria');

const obtenerCategorias = async (req = request, res = response) =>{

    const {desde, limite} = req.query;
    const query = {estado:true};

    const [categorias, total] = await Promise.all([
        Categoria.find(query).skip(desde).limit(limite).populate("usuario", "correo"),
        Categoria.countDocuments(query),
    ])

    res.json({
        total,
        categorias
    })

}

const obtenerCategoria = async (req = request, res = response) =>{

    const {id} = req.params;

    const categoria = await Categoria.findById(id).populate("usuario", "nombre correo");

    res.json({
        categoria
    })
}

const crearCategorias = async (req = request, res = response) =>{

    const nombre = req.body.nombre.toUpperCase();

    //Verificar si la categoria ya existe
    const categoriaDB = await Categoria.findOne({nombre});

    if(categoriaDB){
        res.status(400).json({
            msg:`La categoría ${categoriaDB.nombre} ya existe`
        })
    }

    //generar data que vamos a guardar
    const data ={
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);

    await categoria.save();

    res.status(201).json({
        categoria,
        msg:'Categoria creada exitosamente'
    })

}

const actualizarCategorias = async (req = request, res = response) =>{

    const {id} = req.params;

    const nombre = req.body.nombre.toUpperCase();

    //obtenemos el usuario
    const usuario = req.usuario._id;

    //generar la data

    const data = {
        nombre,
        usuario
    }

    //guardar data
    const categoria = await Categoria.findByIdAndUpdate(id, data, {new:true});

    res.status(201).json({
        categoria,
        msg:'Categoría actualizada'
    })
}

const borrarCategorias = async (req = request, res = response) =>{

    const {id} = req.params;

    const categoriaBorrada = await Categoria.findByIdAndUpdate(id, {estado:false}, {new:true})

    res.json({
        categoriaBorrada,
        msg:'Categoría inactivada'
    })
}


module.exports = {
    obtenerCategorias,
    obtenerCategoria,
    crearCategorias,
    actualizarCategorias,
    borrarCategorias
}