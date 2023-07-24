const {response, request} = require('express');

const usersGet = (req = request, res = response) =>{

    const {apiKey, limit} = req.query;

    res.json({
        message: "Get users",
        apiKey,
        limit
    })
}

const usersPost = (req = request, res = response) =>{
    const {nombre, edad} = req.body;

    res.json({
        message: "Post users",
        nombre,
        edad,
    })
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