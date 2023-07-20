const {Router} = require('express');
const {usuariosGet, usuariosPost, usuariosDelete, usuariosUpdate} = require('../controllers/usuariosControllers')


const router = Router();

 

router.get('/api/usuarios', usuariosGet )


  router.post('/api/usuarios', usuariosPost )
  

  router.delete('/api/usuarios/:id', usuariosDelete);


  module.exports=router;