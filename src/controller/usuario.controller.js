const Usuario = require("../model/usuario.model");
const { validaData } = require("../helpers/validar");


const prueba = (req, res) => {
  return res.status(200).json({
    mensaje: "Hola mundo desde usuarioController",
  });
};

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
};

module.exports = {
  prueba,
  crear,
};

/**
 * @param {validaData} validar los datos ingresado utilizando la librería validator
 * @param {save} Guarda las información en la Base de Datos mediante la librería de mongoose
 */
