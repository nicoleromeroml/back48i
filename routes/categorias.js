const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar_campos');
const {validarJWT} = require('../middlewares/validar-jwt');
const {esAdminRol} = require('../middlewares/validar-roles');
const { obtenerCategorias, obtenerCategoria, crearCategorias, actualizarCategorias, borrarCategorias } = require('../controllers/categorias');
const { categoriaExiste } = require('../helpers/db-validators');

const router = Router();

router.get('/', [validarJWT, validarCampos], obtenerCategorias);

router.get('/:id', [
    validarJWT,
    check("id", "No es un ID válido").isMongoId(),
    //validar si existe una categoría con ese id,
    check('id').custom(categoriaExiste),
    validarCampos
], obtenerCategoria);

router.post('/', [
    validarJWT,
    esAdminRol,
    validarCampos
], crearCategorias);

router.put('/:id', [
    validarJWT,
    esAdminRol,
    check("id", "No es un ID válido").isMongoId(),
    check("nombre", "El nombre es obligatorio").notEmpty(),
    //validar si existe una categoría con ese id,
    check('id').custom(categoriaExiste),
    validarCampos
], actualizarCategorias);

router.delete('/:id', [
    validarJWT,
    esAdminRol,
    check("id", "No es un ID válido").isMongoId(),
    //validar si existe una categoría con ese id,
    check('id').custom(categoriaExiste),
    validarCampos
], borrarCategorias);


module.exports = router;
