const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
    nombre:{
        type: String,   
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    fecha:{
        type: Date,
        default: Date.now
    },
    imagen:{
        type: String,
        default: "default.png"
    }
});

module.exports = model("Usuario", UsuarioSchema, "usuarios");