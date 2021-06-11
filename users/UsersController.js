const routes = require("express").Router()
const bcrypt = require("bcryptjs")
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

    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(password, salt)

    User.create({
        email: email,
        password: hash
    }).then(() => {
        res.redirect("/")
    }).catch(err => {
        res.redirect("/")
    })
})

module.exports = routes