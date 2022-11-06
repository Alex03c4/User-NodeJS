const express = require("express")
const UsuarioController = require("../controller/usuario.controller")

const router = express.Router()

router.get("/prueba", UsuarioController.prueba)
router.post("/crear", UsuarioController.crear)
router.get("/listar", UsuarioController.listar)
router.get("/buscar/:id", UsuarioController.buscar)
router.delete("/eliminar/:id", UsuarioController.eliminar)
router.put("/actualizar/:id", UsuarioController.actualizar);

module.exports = router


/**
 * @param {/listar/:ultimos?} el ? permite que el parámetro no sea obligatorio 
 */