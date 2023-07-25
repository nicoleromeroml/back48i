const {Router} = require ('express');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar_campos');

//en vez de usar app ahora usamos router
const router = Router();

const {usersGet, usersPost, usersPut, usersDelete} = require('../controllers/usuariosControllers');

//la peticion get es cuando desde el back le pedimos info al front
router.get('/', usersGet);

//! Antes de llamar a usersPost(peticion post), debería chequear los datos para recien pasar a userspost cuando la validacion sea efectiva

//desde el front le decimos que guardamos datos para almacenarlos en el back
router.post('/',
[
    //* Le estamos diciendo el campo que queremos validar, el mensaje de error y 
    //* el método que va a verificar esa validacióm, es decir que ese campo no tiene que estar vacío
    check("nombre", "El nombre es obligatorio").notEmpty(),

    //* Validamos el campo password, le mandamos mensaje de error validando la cantidad de caracteres,
    //* utilizamos la propiedad isLength para pasarle el minimo, se le puede pasar un maximo también
    //? También se pueden usar expresiones regulares con un método match, matchea la expresión regular pasada con el valor del campo
    check("password", "La contraseña debe tener un mínimo de 6 caracteres").isLength({min:6}),

    check("correo", "No es un correo válido").isEmail(),

    //*hay que especificar cuales son los roles que si son validos
    check("rol", "El rol no es válido").isIn("USER_ROLE", "ADMIN_ROLE"),
    validarCampos
]
, usersPost);

//sirve para actualizar datos, junto con el path va con un id
router.put('/:id', usersPut);

//borra info, va con id tambien
router.delete('/:id', usersDelete);

module.exports = router;

//Desde el servidor vamos a decirle que apunte a esta ruta