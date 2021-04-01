const express = require('express')
const mongoose = require('mongoose')
const requireDir = require('require-dir')
const cors = require('cors')

//Iniciando o app
const app = express()
app.use(express.json())
app.use(cors())

//Iniciando e criando o BD
mongoose.connect('mongodb://localhost:27017/swords',
{ useNewUrlParser: true, useUnifiedTopology: true })
.then(conn => {
    console.log("Conectado com o Banco de Dados")
}).catch(err => {
    console.log("Falha na conexão com o Banco de Dados")
})

requireDir('./src/models')

//ROTAS
app.use("/api", require("./src/routes"))

app.listen(3002)