const mongoose = require("mongoose")
const Usuarios = mongoose.model("Usuarios")
const Yup = require("yup")

module.exports = {
    async index(req, res){
        const {page =1} = req.query
        const usuario = await Usuarios.paginate({}, {page, limit: 8})

        return res.json(usuario)
    },

    async store(req, res){
        const schema = Yup.object().shape({
                    
            nome: Yup.string(),
            endereco: Yup.string(),
            anos: Yup.string(),
            email: Yup.string(),
            cpf: Yup.string(),
            descricao: Yup.string(),
            nascimento: Yup.string(),
            apelido: Yup.string(),
            titulo: Yup.string(),

        })
        
        if(!(await schema.isValid(req.body))){
           return res.status(400).json({error: "Validation fails"})
        }

        const usuario = await Usuarios.create(req.body)

        return res.json(usuario)
    },

    async show(req, res){
        const usuario = await Usuarios.findById(req.params.id)

        return res.json(usuario)
    },
    
    async update(req, res){
        const schema = Yup.object().shape({
                    
            nome: Yup.string(),
            endereco: Yup.string(),
            anos: Yup.string(),
            email: Yup.string(),
            cpf: Yup.string(),
            descricao: Yup.string(),
            nascimento: Yup.string(),
            apelido: Yup.string(),
            titulo: Yup.string()

        })
        
        if(!(await schema.isValid(req.body))){
           return res.status(400).json({error: "Validation fails"})
        }
        
        const usuario = await Usuarios.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })

        return res.json(usuario)
    },

    async destroy(req, res){
        await Usuarios.findByIdAndRemove(req.params.id)

        return res.send()       
    }

}