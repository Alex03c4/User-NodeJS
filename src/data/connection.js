const mongoose = require("mongoose");
const connection = async() => {

    try {
    	await mongoose.connect("mongodb+srv://Alex03c4:Alex4596149x**@cluster0.myvgi.mongodb.net/login");
        //await mongoose.connect("mongodb://localhost:27017/login");

        // parámetro dentro de objeto *** Solo en Caso de aviso
        // useNewUrlParse: true
        // sesUnifiedTopology:true
        // sesCreateIndex:true

        console.log("Conectado correctamente a la base de datos!!");
    } catch (error) {
        console.log(error);
        throw new Error("No se ha podido conectar a la base de datos");
    }

}

module.exports = {
    connection
}