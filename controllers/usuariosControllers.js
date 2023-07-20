const express = require('express')
const {respose, request} = require('express')

const usuariosGet = (req = request  ,res= respose ) => {
    res.json({
    mensaje: 'soy un msj de la api usuarios FUNCIONA',
    })
}
const usuariosPost = (req = request, res = respose)  => {
    const body = req.body;
    res.json({
        mensaje: 'POST de usuarios',
        body,
    
    })
}
const usuariosDelete = (req = request, res= respose) => {
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