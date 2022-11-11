const express = require("express")
const multer = require("multer") // IMG
const UsuarioController = require("../controller/usuario.controller")

const router = express.Router()

const guardarImagen = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/img/usuario/');
    },
    filename: function(req, file, cb){
        cb(null, "User:"+ Date.now() +":"+ file.originalname)
    }
})

const subidas = multer({storage: guardarImagen})

router.get("/prueba", UsuarioController.prueba)
router.post("/crear", UsuarioController.crear)
router.get("/listar", UsuarioController.listar)
router.get("/buscar/:id", UsuarioController.buscar)
router.delete("/eliminar/:id", UsuarioController.eliminar)
router.put("/actualizar/:id", UsuarioController.actualizar);
router.post("/subirImagen/:id", [subidas.single("file0")], UsuarioController.subirImagen)
router.get("/buscarImagen/:fichero", UsuarioController.buscarImagen)
router.get("/buscarUser/:busqueda", UsuarioController.buscadorUser)


module.exports = router


/**
 * @param {/listar/:últimos?} el ? permite que el parámetro no sea obligatoria.
 * @param {multer} Utilizado para la subida de archivos.
 * @param {destination} Ruta para guardar un archivo.
 * @param {filename} nombre con el cual se guardara el archivo.
 */