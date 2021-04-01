import React, {Component} from 'react'
import api from '../../services/api'
import './styles.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import {Redirect} from 'react-router'

export default class Product extends Component{
    state ={
        redirect: false,
        product: {},
        productTemp: {nome: '', descricao: '', valor: ''}
    }

    async componentDidMount(){
        const {id} = this.props.match.params
        const response = await api.get(`/products/${id}`)
        this.setState({product: response.data}) 
    }

    loadTemp(){
        this.setState({productTemp: {...this.state.product}})
    }

    loadProduct(){
        this.setState({product: {...this.state.productTemp}})
    }

    remove(product){
        this.setState({redirect: true})
        api.delete(`products/${product._id}`).catch((error) =>
            alert("Falha ao tentar excluir! ERRO: " + error))
        this.clearProduct()
    }

    save(){
        this.setState({redirect: true})
        const product = {...this.state.productTemp}
        api.post('/products/', {
            nome: product.nome,
            descricao: product.descricao,
            valor: product.valor,
            quantidade: ' ',
            tipo: ' ',
            tamanho: ' ',
            peso: ' ',
            marca: ' ',
            garantia: ' '

        }).catch((error) => alert("Falha ao tentar cadastrar! ERRO: " + error))
        this.clear()
    }

    updateProduct(){
        const product = {...this.state.productTemp}
        api.put(`/products/${product._id}`,{
            nome: product.nome,
            descricao: product.descricao,
            valor: product.valor,
            quantidade: ' ',
            tipo: ' ',
            tamanho: ' ',
            peso: ' ',
            marca: ' ',
            garantia: ' '
        }).catch((error) => alert("Falha ao tentar atualizar! ERRO: " + error))
        this.clear()
        this.loadProduct()
    }

    clear(){
        this.setState({productTemp: {nome: '', descricao: '', valor: ''} })
    }

    clearProduct(){
        this.setState({product: {nome: '', descricao: '', valor: ''} })
    }

    handleChange(event){
        const productTemp = {...this.state.productTemp}
        productTemp[event.target.name] = event.target.value
        this.setState({productTemp})

    }

render(){
    const {product} = this.state
    const {productTemp} = this.state
      
    if(this.state.redirect){
        return <Redirect to="/"/>
    }else{
      
    return(
        <div>       
            <div className="produto-info">
                <h1>{product.nome}</h1>
                <p>{product.descricao}</p>
                <p>{product.valor}</p>

                <button className="btn btn-warning " onClick={() => this.loadTemp()}>
                    <i className="fa fa-pencil"/>
                </button>
                <button className="btn btn-danger ml-2" onClick={() => this.remove(product)}>
                    <i className="fa fa-trash"/>
                </button> 
            </div>

            <form className="produto-form">
                <div className="fields">
                    <div className="form-group">
                        <label>Nome: </label>
                        <input type="text" name="nome" value={productTemp.nome} 
                            className="form-control" onChange={e => this.handleChange(e)}/>
                    </div>

                    <div className="form-group">
                        <label>Descrição: </label>
                        <input type="text" name="descricao" value={productTemp.descricao} 
                            className="form-control" onChange={e => this.handleChange(e)}/>
                    </div>
                        
                    <div className="form-group">
                        <label>Valor: </label>
                        <input type="text" name="valor" value={productTemp.valor}
                            className="form-control" onChange={e => this.handleChange(e)}/>
                    </div>
                </div>
                <div className="row-buttons">
                    <input className="btn btn-primary" type="button" value="Atualizar" onClick={e => this.updateProduct(product.id, product)}/>
                    <input className="btn btn-success ml-2" type="button" value="Novo" onClick={e => this.save(e)}/>
                    <input className="btn btn-secondary ml-2" type="button" value="Cancelar" onClick={e => this.clear(e)}/>
                </div>
            </form>

          </div>
      )
        
        }
    }
}