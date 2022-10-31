const express = require("express")
const UsuarioController = require("../controller/usuario.controller")

const router = express.Router()

router.get("/prueba", UsuarioController.prueba)
router.post("/crear", UsuarioController.crear)
router.get("/listar", UsuarioController.listar)


module.exports = router


/**
 * @param {/:ultimos?} el ? permite que el parámetro no sea obligatorio 
 */