import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Main from './Pages/Main'
import Product from "./Pages/Product"
import Home from "./Pages/Home"
import User from "./Pages/User"
import Usuarios from "./Pages/Usuario"

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/product" component={Main} />
            <Route path="/products/:id" component={Product} />
            <Route exact path="/usuarios" component={User}/>
            <Route path="/usuarios/:id" component={Usuarios} />
        </Switch>
    </BrowserRouter>
)

export default Routes