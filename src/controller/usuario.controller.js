const fs = require("fs"); //imagen
const path = require("path");
const Usuario = require("../model/usuario.model")
const { validaData } = require("../helpers/validar")

const prueba = (req, res) => {
  return res.status(200).json({
    mensaje: "Hola mundo desde usuarioController",
  })
}

const crear = (req, res) => {
  let data = req.body;
  try {
    validaData(data);
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "Faltan datos por enviar",
    });
  }

  const user = new Usuario(data);
  user.save((error, userGuardado) => {
    if (error || !userGuardado) {
      return res.status(400).json({
        status: "error",
        mensaje: "No se ha guardado el articulo",
      });
    }

    return res.status(200).json({
      status: "success",
      data
    });
  });
}

const listar = (req, res) => {
  Usuario.find({}).exec((error, usuario)=>{
    if (error || !usuario) {
      return res.status(404).json({
        status: "error",
        mensaje: "No se han encontrado el usuario",
      })
    }
    return res.status(200).json({
      status: "success",
      usuario 
    })
  })
  
}

const buscar = (req, res) => {
  let id = req.params.id  
  Usuario.findById(id, (error, usuario) => {
    if (error || !usuario) {
      return res.status(404).json({
        status: "error",
        mensaje: "No se han encontrado el usuario",
      })
    }
    return res.status(200).json({
      status: "success",
      usuario,
    })
  })
}

const eliminar = (req, res) => {
  let id = req.params.id 
  Usuario.findByIdAndDelete({ _id: id }, (error, usuarioBorrado) => {
    if (error || !usuarioBorrado) {
      return res.status(500).json({
        status: "error",
        mensaje: "Error al borrar el articulo",
      })
    }
    return res.status(200).json({
      status: "success",
      usuarioBorrado
    })
  })
}

const actualizar = (req, res) => {
  let id = req.params.id
  let data = req.body

  try {
    validaData(data)
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "Faltan datos por enviar",
    })
  }
  
  Usuario.findOneAndUpdate(
    { _id: id },
    req.body,
    { new: true },
    (error, usuarioActualizado) => {
      if (error || !usuarioActualizado) {
        return res.status(500).json({
          status: "error",
          mensaje: "Error al actualizar",
        })
      }

      return res.status(200).json({
        status: "success",
        articulo: usuarioActualizado,
      })
    }
  )  
}

const subirImagen  = (req, res) => { 
  if (!req.file && !req.files) {
    return res.status(404).json({
      status: "error",
      mensaje: "Petición invalida",
    })
  }

  let archivo = req.file.originalname
  let archivo_split = archivo.split(".")
  let extension = archivo_split[1]

  if (
    extension != "png" &&
    extension != "jpg" &&
    extension != "jpeg" &&
    extension != "gif"
  ) {
    fs.unlink(req.file.path, (error) => {
      return res.status(400).json({
        status: "error",
        mensaje: "Imagen invalida",
      })
    })
  } else {

    let id = req.params.id
    Usuario.findOneAndUpdate(
      { _id: id },
      { imagen: req.file.filename },
      { new: true },
      (error, usuarioActualizado) => {
        if (error || !usuarioActualizado) {
          return res.status(500).json({
            status: "error",
            mensaje: "Error al actualizar",
          });
        }

        return res.status(200).json({
          status: "success",
          articulo: usuarioActualizado,
          fichero: req.file,
        });
      }
    );
  }
}

const buscarImagen = (req, res) => {
  let fichero = req.params.fichero;
  let ruta = "./public/img/usuario/" + fichero;
  fs.stat(ruta, (error, existe) => {
    if (existe) {
      return res.sendFile(path.resolve(ruta));
    } else {
      return res.status(404).json({
        status: "error",
        mensaje: "La imagen no existe",
        existe,
        fichero,
        ruta,
      })
    }
  })
}

const buscadorUser = (req, res) => {
  let busqueda = req.params.busqueda;

  Usuario.find({
    $or: [
      { nombre:   { $regex: busqueda, $options: "i" } },
      { apellido: { $regex: busqueda, $options: "i" } },
    ],
  })
    .sort({ fecha: -1 })
    .exec((error, userEncontrados) => {
      if (error || !userEncontrados || userEncontrados.length <= 0) {
        return res.status(404).json({
          status: "error",
          mensaje: "No se han encontrado Usuario",
        })
      }

      return res.status(200).json({
        status: "success",
        userEncontrados
      })
    })
}

module.exports = {
  prueba,
  crear,
  listar,
  buscar,
  eliminar,
  actualizar,
  subirImagen,
  buscarImagen,
  buscadorUser,
}

/**
 * @param {validaData} validar los datos ingresado utilizando la librería validator.
 * @param {save} Guarda las información en la Base de Datos mediante la librería de mongoose.
 * @param {find} Crea un conjunto de filtros para la búsqueda. 
 * @param {exec} Consulta la BDD y devuelve un listado.
 * @param {sort} para poder ordenar una lista.
 * @param {findById} filtra una búsqueda de un elemento por medio de un id.
 * @param {findByIdAndDelete} Elimina un elemento de la BDD.
 * @param {findOneAndUpdate} Actualiza los datos de una BDD.
 * @param {params} consigue el parámetro enviado por la url.
 * @param {unlink} elimina un archivo-
 * @param {path} busca el archivo para luego enviarlo 
 */
