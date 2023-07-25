const {validationResult} = require('express-validator');


//! 1. Copiar el codigo de error
// const errors = validationResult(req);
// if(!errors.isEmpty()){
//     return res.status(400).json(errors);
// }

//! 2. englobarlo en una funcion
// const validarCampos = () =>{
//     const errors = validationResult(req);
//     if(!errors.isEmpty()){
//         return res.status(400).json(errors);
//     }
// }

//!3. pasarle los metodos por parametros
// const validarCampos = (req, res, next) =>{
//     const errors = validationResult(req);
//     if(!errors.isEmpty()){
//         return res.status(400).json(errors);
//     }
// }

//! 4.Necesitamos el validationResult entonces lo importamos

//! 5. Llamamos al metodo next
//* "Si no encuentra errores, continuamos"

const validarCampos = (req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    next()
}

//! 6. exportamos

module.exports = {
    validarCampos
};