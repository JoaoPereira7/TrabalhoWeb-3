const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const UsuariosSchema = new mongoose.Schema({
    nome:{
        type: String,
        required:true,
    },
    endereco:{
        type: String,
        required:true,
    },
    anos:{
        type: String,
        required:true,
    },
    email:{
        type: String,
        required:true,
    },
    cpf:{
        type: String,
        required:true,
    },
    descricao:{
        type: String,
        required:true,
    },
    nascimento:{
        type: String,
        required:true,
    },
    apelido:{
        type: String,
        required:true,
    },
    titulo:{
        type: String,
        required:true,
    },
    data:{
        type: Date,
        default: Date.now,
    },
})

UsuariosSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Usuarios', UsuariosSchema)