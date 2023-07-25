const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    //nombre
    //correo
    //password
    //img
    //rol (user, admin)
    //estado (true, false)

nombre: {
    type: String,
    required : [true, "El nombre del usuario es obligatorio"]
},
correo: {
    type : String,
    required : [true, "El email es un campo requerido"],
    unique: true
},
password: {
    type: String,
    required: [true, "El password del usuario es obligatorio"]
}, 
img : {
    type : String
},
rol: {
    type : String,
    required: true,
    enum : ["USER_ROLE", "ADMIN_ROLE"]
},
estado : {
    type: Boolean,
    default: true
}

})

module.exports = model("Usuario", UsuarioSchema);