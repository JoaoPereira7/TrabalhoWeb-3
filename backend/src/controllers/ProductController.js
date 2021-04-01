const mongoose = require("mongoose")
const Product = mongoose.model("Product")
const Yup = require("yup")


module.exports = {
    async index(req, res){
        const { page = 1} = req.query
        const products = await Product.paginate({}, {page, limit: 8})

        return res.json(products)
    },

    async store(req, res){
        
        const schema = Yup.object().shape({
                    
            nome: Yup.string(),
            descricao: Yup.string(),
            valor: Yup.string(),
            quantidade: Yup.string(),
            tipo: Yup.string(),
            tamanho: Yup.string(),
            peso: Yup.string(),
            marca: Yup.string(),
            garantia: Yup.string()
        
        })
        
        if(!(await schema.isValid(req.body))){
           return res.status(400).json({error: "Validation fails"})
        }

        //Criação
        const product = await Product.create(req.body)

        return res.json(product)
    },
    async show(req, res){
        const product = await Product.findById(req.params.id)

        return res.json(product)
    },
    
    async update(req, res){
        const schema = Yup.object().shape({
                    
            title: Yup.string(),
            descricao: Yup.string(),
            valor: Yup.string(),
            quantidade: Yup.string(),
            tipo: Yup.string(),
            tamanho: Yup.string(),
            peso: Yup.string(),
            marca: Yup.string(),
            garantia: Yup.string()  
        
        })
        
        if(!(await schema.isValid(req.body))){
           return res.status(400).json({error: "Validation fails"})
        }
       
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })

        return res.json(product)
    },

    async destroy(req, res){
        await Product.findByIdAndRemove(req.params.id)

        return res.send()       
    }

}