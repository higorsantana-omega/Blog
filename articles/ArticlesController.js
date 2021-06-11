const routes = require("express").Router()
const Category = require("../categories/Category")
const Article = require("./Article")
const slugify = require("slugify")

routes.get("/admin/articles", (req, res) => {
    Article.findAll({
        include: [{model: Category}]
    }).then(article => {
        res.render("admin/articles/index", {articles: article})
    })
})

routes.get("/admin/articles/new", (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/articles/new", {categories: categories})
    })
})

routes.post("/articles/save", (req, res) => {
    let title = req.body.title
    let body = req.body.body
    let category = req.body.category

    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoriaId: category
    }).then(() => {
        res.redirect("/admin/articles")
    })
})

routes.post("/articles/delete", (req, res) => {
    let id = req.body.id
    if(id != undefined) {
        if (!isNaN(id)) {
            Article.destroy({
                where: {
                   id: id
               }
            }).then(() => {
               res.redirect("/admin/articles")
           })
        } else { // !Numero
            res.redirect("/admin/articles")
       }
    } else { // NULL 
        res.redirect("/admin/articles")
    }
})

routes.get("/admin/articles/edit/:id", (req, res) => {
    let id = req.params.id
    Article.findByPk(id).then(artigo => {
        if (artigo != undefined) {

            Category.findAll().then(categories => {
                res.render("admin/articles/edit", {categories: categories, artigo:artigo})
                
            })

        } else {
            res.redirect("/")
        }
    }).catch(error => {
        res.redirect("/")
    })
})

routes.post("/articles/update", (req, res) => {
    let id = req.body.id
    let title = req.body.title
    let body = req.body.body
    let category = req.body.category
    
    Article.update({
        title: title,
        slug: slugify(title),
        body: body,
        categoriaId: category
    }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/admin/articles")
    }).catch(err => {
        res.redirect("/")
    })
})

module.exports = routes;