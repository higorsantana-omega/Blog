const Sequelize = require("sequelize")

const connection = new Sequelize('blog', 'root', 'red12mov', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: "-03:00"
})

module.exports = connection