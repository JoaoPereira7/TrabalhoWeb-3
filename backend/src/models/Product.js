const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const ProductSchema = new mongoose.Schema({
    nome:{
        type: String,
        required:true,
    },
    descricao:{
        type: String,
        required:true,
    },
    valor:{
        type: String,
        required:true,
    },
    quantidade:{
        type: String,
        required:true,
    },
    tipo:{
        type: String,
        required:true,
    },
    tamanho:{
        type: String,
        required:true,
    },
    peso:{
        type: String,
        required:true,
    },
    marca:{
        type: String,
        required:true,
    },
    garantia:{
        type: String,
        required:true,
    },
    data:{
        type: Date,
        default: Date.now,
    },
})

ProductSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Product', ProductSchema)

