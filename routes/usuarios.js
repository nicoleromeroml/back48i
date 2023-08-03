const {Router} = require ('express');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar_campos');

//en vez de usar app ahora usamos router
const router = Router();

const {usersGet, usersPost, usersPut, usersDelete} = require('../controllers/usuariosControllers');
const { esRolValido, emailExiste, usuarioExiste } = require('../helpers/db-validators');
const { validarJWT } = require('../middlewares/validar-jwt');


router.get('/', usersGet);

router.post('/',
[
    check("password", "La contraseña debe tener un mínimo de 6 caracteres").isLength({min:6}),
    check("correo", "No es un correo válido").isEmail(),
    check("correo").custom(emailExiste),
    check("rol").custom(esRolValido),
    validarCampos
]
, usersPost);


router.put('/:id',[
    check("id", "No es un ID válido").isMongoId(),
    check("rol").custom(esRolValido),
    check("id").custom(usuarioExiste),
    validarCampos
], usersPut);

router.delete('/:id',[
    validarJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(usuarioExiste),
    validarCampos
], usersDelete);

module.exports = router;

