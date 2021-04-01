import React, {Component} from 'react'
import api from '../../services/api'
import './styles.css'
import { Link } from 'react-router-dom'


export default class Usuarios extends Component{
    state = {
        usuarios:[],
        userInfo:{},
        page: 1,
    }
    
    componentDidMount(){
        this.loadUsuarios()
    }

    loadUsuarios = async (page = 1) =>{
        const response = await api.get(`/usuarios?page=${page}`)
        const {docs, ...userInfo} = response.data

        this.setState({usuarios: docs, userInfo, page})
    }

    nextPage = () => {
        const {page, userInfo} = this.state
        if (page === userInfo.pages) return 
        const pageNumber = page + 1

        this.loadUsuarios(pageNumber)
    }

    prevPage = () => {
        const {page, userInfo} = this.state
        if (page === 1) return 
        const pageNumber = page - 1 

        this.loadUsuarios(pageNumber)
    }

   render(){
    const {usuarios, page, userInfo} = this.state

       return (
            <div className="product-list">
                {usuarios.map(usuario => (
                    <article key={usuario._id}>
                        <strong>{usuario.nome}</strong>
                        <p>{usuario.descricao}</p>
                        <Link to={`/usuarios/${usuario._id}`}>Acessar</Link>
                    </article>
                ))}
                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page === userInfo.pages} onClick={this.nextPage}>Próxima</button>
                </div>
            </div>
            
       )
   }
}