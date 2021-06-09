const routes = require("express").Router()
const Category = require("./Category")
const slugify = require("slugify")
const { Router } = require("express")

routes.get("/categories", (req, res) => {
    res.send("Categorias")
})

routes.get("/admin/categories/new", (req, res) => {
    res.render("../views/admin/categories/new")
})

routes.post("/categories/save", (req, res) => {
    let title = req.body.title
    if (title != undefined) {

        Category.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            res.redirect("/admin/categories")
        })
        
    } else {
        res.redirect("admin/categories/new")
    }
})

routes.get("/admin/categories", (req, res) => {
    Category.findAll().then(categories => {
        res.render("../views/admin/categories/index.ejs", {categories: categories})
    })
})

routes.post("/categories/delete", (req, res) => {
    let id = req.body.id
    if(id != undefined) {
        if (!isNaN(id)) {
            Category.destroy({
                where: {
                   id: id
               }
            }).then(() => {
               res.redirect("/admin/categories")
           })
        } else { // !Numero
            res.redirect("/admin/categories")
       }
    } else { // NULL 
        res.redirect("/admin/categories")
    }
})

routes.get("/admin/categories/edit/:id", (req, res) => {
    let id = req.params.id
    if (isNaN(id)) {
        res.redirect("/admin/categories")
    }

    Category.findByPk(id).then(category => {
        if (category != undefined) {
            res.render("admin/categories/edit", {category: category})
        } else {
            res.redirect("/admin/categories")
        }
    }).catch(error => {
        res.redirect("/admin/categories")
    })
})

module.exports = routes;