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
        mensaje: "No se han encontrado articulos",
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

module.exports = {
  prueba,
  crear,
  listar,
  buscar
};

/**
 * @param {validaData} validar los datos ingresado utilizando la librería validator.
 * @param {save} Guarda las información en la Base de Datos mediante la librería de mongoose.
 * @param {find} Crea un conjunto de filtros para la búsqueda. 
 * @param {exec} Consulta la BDD y devuelve un listado.
 * @param {sort} para poder ordenar una lista.
 * @param {params} consigue el parámetro enviado por la url 
 */
