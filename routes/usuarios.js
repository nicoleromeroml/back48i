const {Router} = require('express');


const router = Router();

 

router.get('/api/usuarios', function (req, res) {
  // const {apiKey, limit} = req.query
    res.json({
        mensaje: 'soy un msj de la api usuarios',
        // apiKey, limit

    })
  })
  router.post('/api/usuarios', function (req , res) {
    const body = req.body;
    res.json({
        mensaje: 'POST de usuarios',
        body,
    
    })
  })
  router.put('/api/usuarios/:id', function (req, res) {
    res.json({
        mensaje: 'Put de usuarios'
    
    })
  })
  router.delete('/api/usuarios/:id', function (req, res) {
    res.json({
        mensaje: 'delete de usuarios'
    
    })
  })
  module.exports=router;