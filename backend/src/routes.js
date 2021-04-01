const express = require("express");
const routes = express.Router();


// Rotas dos produtos
const ProductController = require("./controllers/ProductController")

routes.get("/products", ProductController.index)
routes.post("/products", ProductController.store)
routes.get("/products/:id", ProductController.show)
routes.put("/products/:id", ProductController.update)
routes.delete("/products/:id", ProductController.destroy)


// Rotas dos usuarios
const UsuariosController = require("./controllers/UsuariosController")

routes.get("/usuarios", UsuariosController.index) 
routes.post("/usuarios", UsuariosController.store)
routes.get("/usuarios/:id", UsuariosController.show)
routes.put("/usuarios/:id", UsuariosController.update)
routes.delete("/usuarios/:id", UsuariosController.destroy)


module.exports = routes
