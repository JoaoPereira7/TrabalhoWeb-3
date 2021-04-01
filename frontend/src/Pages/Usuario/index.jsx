import React, {Component} from 'react'
import api from '../../services/api'
import './styles.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import {Redirect} from 'react-router'

export default class Usuarios extends Component{
    state ={
        redirect: false,
        usuarios: {},
        usuariosTemp: {nome: '', anos: '', descricao: ''}
    }

    async componentDidMount(){
        const {id} = this.props.match.params
        const response = await api.get(`/usuarios/${id}`)
        this.setState({usuarios: response.data}) 
    }

    loadTemp(){
        this.setState({usuariosTemp: {...this.state.usuarios}})
    }

    loadUsuarios(){
        this.setState({usuarios: {...this.state.usuariosTemp}})
    }

    remove(usuarios){
        this.setState({redirect: true})
        api.delete(`usuarios/${usuarios._id}`).catch((error) =>
            alert("Falha ao tentar excluir! ERRO: " + error))
        this.clearUsuarios()
    }

    save(){
        this.setState({redirect: true})
        const usuarios = {...this.state.usuariosTemp}
        api.post('/usuarios/', {
            nome: usuarios.nome,
            anos: usuarios.anos,
            descricao: usuarios.descricao,
            email: " ",
            cpf: " ",
            endereco: " ",
            nascimento: " ",
            apelido: " ",
            titulo: " ",
            
        }).catch((error) => alert("Falha ao tentar cadastrar! ERRO: " + error))
        this.clear()
    }

    updateProduct(){
        const usuarios = {...this.state.usuariosTemp}
        api.put(`/usuarios/${usuarios._id}`,{
            nome: usuarios.nome,
            anos: usuarios.anos,
            descricao: usuarios.descricao,
            email: " ",
            cpf: " ",
            endereco: " ",
            nascimento: " ",
            apelido: " ",
            titulo: " ",
        }).catch((error) => alert("Falha ao tentar atualizar! ERRO: " + error))
        this.clear()
        this.loadUsuarios()
    }

    clear(){
        this.setState({usuariosTemp: {nome: '', anos: '', descricao: ''} })
    }

    clearUsuarios(){
        this.setState({usuarios: {nome: '', anos: '', descricao: ''} })
    }

    handleChange(event){
        const usuariosTemp = {...this.state.usuariosTemp}
        usuariosTemp[event.target.name] = event.target.value
        this.setState({usuariosTemp})

    }

render(){
    const {usuarios} = this.state
    const {usuariosTemp} = this.state
      
    if(this.state.redirect){
        return <Redirect to="/"/>
    }else{
      
    return(
        <div>       
            <div className="produto-info">
                <h1>{usuarios.nome}</h1>
                <p>{usuarios.anos}</p>
                <p>{usuarios.descricao}</p>

                <button className="btn btn-warning " onClick={() => this.loadTemp()}>
                    <i className="fa fa-pencil"/>
                </button>
                <button className="btn btn-danger ml-2" onClick={() => this.remove(usuarios)}>
                    <i className="fa fa-trash"/>
                </button> 
            </div>

            <form className="produto-form">
                <div className="fields">
                    <div className="form-group">
                        <label>Nome: </label>
                        <input type="text" name="nome" value={usuariosTemp.nome} 
                            className="form-control" onChange={e => this.handleChange(e)}/>
                    </div>

                    <div className="form-group">
                        <label>Anos: </label>
                        <input type="text" name="anos" value={usuariosTemp.anos} 
                            className="form-control" onChange={e => this.handleChange(e)}/>
                    </div>
                        
                    <div className="form-group">
                        <label>Descricao: </label>
                        <input type="text" name="descricao" value={usuariosTemp.descricao}
                            className="form-control" onChange={e => this.handleChange(e)}/>
                    </div>
                </div>
                <div className="row-buttons">
                    <input className="btn btn-primary" type="button" value="Atualizar" onClick={e => this.updateProduct(usuarios.id, usuarios)}/>
                    <input className="btn btn-success ml-2" type="button" value="Novo" onClick={e => this.save(e)}/>
                    <input className="btn btn-secondary ml-2" type="button" value="Cancelar" onClick={e => this.clear(e)}/>
                </div>
            </form>

          </div>
      )
        
        }
    }
}