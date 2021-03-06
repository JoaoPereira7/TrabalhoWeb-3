import React, {Component} from 'react'
//import { Link } from 'react-router-dom'
import api from '../../services/api'
import './styles.css'
import {Link} from 'react-router-dom'

export default class Produtos extends Component{
    state = {
        products:[],
        productInfo:{},
        page: 1,
    }
    
    componentDidMount(){
        this.loadProducts()
    }

    loadProducts = async (page = 1) =>{
        const response = await api.get(`/products?page=${page}`)
        const {docs, ...productInfo} = response.data

        this.setState({products: docs, productInfo, page})
    }

    nextPage = () => {
        const {page, productInfo} = this.state
        if (page === productInfo.pages) return 
        const pageNumber = page + 1

        this.loadProducts(pageNumber)
    }

    prevPage = () => {
        const {page} = this.state
        if (page === 1) return 
        const pageNumber = page - 1 

        this.loadProducts(pageNumber)
    }

   render(){
    const {products, page, productInfo} = this.state

       return (
            <div className="product-list">
                {products.map(product => (
                    <article key={product._id}>
                        <strong>{product.nome}</strong>
                        <p>{product.descricao}</p>
                        <Link to={`/products/${product._id}`}>Acessar</Link>
                    </article>
                ))}
                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page === productInfo.pages} onClick={this.nextPage}>Próxima</button>
                </div>
            </div>
            
       )
   }
}