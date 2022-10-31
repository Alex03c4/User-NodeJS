const validator = require("validator");

const validaData = (data) => {
  let validarNombre =
    !validator.isEmpty(data.nombre) &&
    validator.isLength(data.nombre, { min: 4, max: undefined });

  let validarApellido =
    !validator.isEmpty(data.apellido) &&
    validator.isLength(data.apellido, { min: 4, max: undefined });

  if (!validarNombre || !validarApellido) {
    throw new Error("No se ha validado la información !!");
  }
};

module.exports = {
  validaData,
};
