// Importar express e instancialo
let express = require("express"),
    app = express(),
    // PORT
    port = parseInt(process.env.PORT, 10) || 8080

// Importar o body parser
const bodyParser = require("body-parser")

// Session
const session = require("express-session")

// Importar o banco de dados
const connection = require("./database/database")

// Importar rotas
const categoriesController = require("./categories/CategoriesController")
const articlesController = require("./articles/ArticlesController")
const usersController = require("./users/UsersController")


const Article = require("./articles/Article")
const Category = require("./categories/Category")
const User = require("./users/User")

const path = require('path')
let dir = path.join(__dirname, 'public')

// Motor de renderização = ejs
app.set('view engine', 'ejs')


// Session
app.use(session({
    secret: "loremipsum",
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 3600000}
}))


// Local onde ficara os arquivos estaticos
app.use(express.static(dir))

// app.use('/static', express.static('img'))
// Body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita")
    }).catch((error) => {
        console.log(error)
    })

// Rotas das categorias
app.use("/", categoriesController)
// Rotas dos artigos
app.use("/", articlesController)
// Rotas dos usuarios
app.use("/", usersController)

app.get("/", (req, res) => {
    Article.findAll({
        order: [
            ['id', 'DESC']
        ],

        limit: 4
    }).then(articles => {
        Category.findAll().then(categories => {
        res.render("index", {articles: articles, categories: categories})
        })
    })
})

app.get("/:slug", (req, res) => {
    let slug = req.params.slug
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if(article != undefined){
            Category.findAll().then(categories => {
            res.render("article", {article: article, categories: categories})
            })
        } else {
            res.redirect("/")
        }
    }).catch(err => {
        res.redirect("/")
    })
})

app.get("/category/:slug", (req, res) => {
    let slug = req.params.slug
    Category.findOne({
        where: {
            slug: slug
        },
        include:[{model: Article}]
    }).then(category => {
        if (category != undefined) {
            Category.findAll().then(categories => {
                res.render("index", {articles: category.artigos, categories: categories})
            })
        } else {
            res.redirect("/")
        }
    }).catch(err => {
        res.redirect("/")
    })
})

// A porta responsavel pela inicialização do servidor
app.listen(port, () => {
    console.log("Rodando servidor")
})