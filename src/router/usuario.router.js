const express = require("express")
const UsuarioController = require("../controller/usuario.controller")

const router = express.Router()

router.get("/prueba", UsuarioController.prueba)
router.post("/crear", UsuarioController.crear)


module.exports = router