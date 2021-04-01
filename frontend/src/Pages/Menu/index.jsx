import React from 'react'
import './styles.css'

const Menu = () => (
    <nav class="app-menu">
        <ul className="app-menu__list">
            <li className="app-menu__item">
                <a href="/"> Home </a>
            </li>
            <li className="app-menu__item">
                <a href="/product"> Produtos </a>
            </li>
            <li className="app-menu__item">
                <a href="/usuarios"> Usuários </a> 
            </li>
        </ul>
    </nav>
)

export default Menu