const {Router} = require('express');
const {check} = require('express-validator')
const {usuariosGet, usuariosPost, usuariosDelete, usuariosUpdate} = require('../controllers/usuariosControllers')
const {validarCampos} = require('../middlewares/validar_campos')


const router = Router();

 

router.get('/api/usuarios', usuariosGet );


  router.post('/api/usuarios',[
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("correo", "No es un email válido").isEmail(),
    check("password", "La contraseña debe tener un mínimo de 6 caracteres").isLength({min:6}),
    check("rol", "El rol no es válido").isIn("USER_ROLE", "ADMIN_ROLE"),
    validarCampos
  ] 
  ,usuariosPost )
  

  router.delete('/api/usuarios/:id', usuariosDelete);

  router.put('/api/usuarios/:id', usuariosUpdate);


  module.exports=router;