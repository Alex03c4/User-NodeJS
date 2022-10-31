const express = require("express")
const {connection} = require("./data/connection")
const cors = require("cors")
const app = express()
const puerto = 3900
app.use(cors())
connection()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const routerUsuario = require("./router/usuario.router")
app.use("/api", routerUsuario)

app.listen(puerto, ()=> {
    console.log("Servidor Corriendo en el puerto " + puerto)
});


/**
 * @param {express} creación del servidor 
 * @param {cors} se utiliza para la conexión entre api 
 * @param {urlencoded} recibir información del formulario por medio de  form-urlencoded
 * @param {listen} inicializar servidor express
 */