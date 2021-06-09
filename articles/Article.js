// MODEL BANCO DE DADOS | ARTIGOS

const Sequelize = require("sequelize")
const connection = require("../database/database")
const Category = require("../categories/Category")

const Article = connection.define('artigos', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }, slug: {
        type: Sequelize.STRING,
        allowNull: false
    }, body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

// Relacionamentos
// 1 - p - m
Category.hasMany(Article) // Uma categoria tem muitos artigos
// 1 - p - 1
Article.belongsTo(Category) // Um artigo pertence a uma categoria

module.exports = Article;