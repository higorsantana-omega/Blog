const routes = require("express").Router()
const bcrypt = require("bcryptjs")
const User = require("./User")

routes.get("/admin/users", (req, res) => {
    User.findAll().then(users => {
        res.render("admin/users/index", {users: users})
    })
})

routes.get("/admin/users/create", (req, res) => {
    res.render("admin/users/create")
})

routes.post("/users/create", (req, res) => {
    let email = req.body.email
    let password = req.body.password

    User.findOne({ where: { email: email }}).then(user => {
        if (user == undefined) {
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
        } else {
            res.redirect("/admin/users/create")
        }
    })
})

routes.get("/login", (req, res) => {
    res.render("admin/users/login")
})

routes.post("/authenticate", (req, res) => {
    let email = req.body.email
    let password = req.body.password

    User.findOne({ where: { email: email } }).then(user => {
        if (user != undefined) {
            // Validar senha
            let passCorrect = bcrypt.compareSync(password, user.password)
            if (passCorrect) {
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.redirect("/admin/articles")
            } else {
                res.redirect("/login")
            }
        } else {
            res.redirect("/login")
        }
    })
})

routes.get("/logout", (req, res) => {
    req.session.user = undefined
    res.redirect("/")
}) 

module.exports = routes