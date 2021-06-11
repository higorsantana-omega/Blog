const routes = require("express").Router()
const User = require("./User")

routes.get("/admin/users", (req, res) => {
    res.send("Usuarios")
})

routes.get("/admin/users/create", (req, res) => {
    res.render("admin/users/create")
})

routes.post("/users/create", (req, res) => {
    let email = req.body.email
    let password = req.body.password
    res.json({email, password})
})

module.exports = routes