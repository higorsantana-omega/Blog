const routes = require("express").Router()

routes.get("/articles", (req, res) => {
    res.send("Artigos")
})

routes.get("/admin/articles/new", (req, res) => {
    res.send("Criar artigos")
})

module.exports = routes;