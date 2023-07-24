const {Router} = require ('express');

//en vez de usar app ahora usamos router
const router = Router();

const {usersGet, usersPost, usersPut, usersDelete} = require('../controllers/usuariosControllers');

//la peticion get es cuando desde el back le pedimos info al front
router.get('/', usersGet);

//desde el front le decimos que guardamos datos para almacenarlos en el back
router.post('/', usersPost);

//sirve para actualizar datos, junto con el path va con un id
router.put('/:id', usersPut);

//borra info, va con id tambien
router.delete('/:id', usersDelete);

module.exports = router;

//Desde el servidor vamos a decirle que apunte a esta ruta