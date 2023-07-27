//modelo de datos de usuario

const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    correo: {
        type: String,
        required: [true, "El correo es obligatorio"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"]
    },
    img: {
        type: String
    },
    rol:{
        type: String,
        required: true,
        // enum: ["USER_ROLE", "ADMIN_ROLE"]
    },
    estado:{
        type: Boolean,
        default: true
    }
})

//Quitar datos en la respuesta json
UsuarioSchema.methods.toJSON = function() {
    const {__v, password, ...usuario} = this.toObject();
    return usuario;
}

module.exports = model("Usuario", UsuarioSchema);
