const Sequelize = require("sequelize")
const db = {}
const sequelize = new Sequelize ("db_groupomania", "root", "root" , {
    host: "localhost",
    dialect: "mysql",
    pool : {
        max: 5,
        min: 1,
        acquire: 30000,
        idle: 10000
    }
})

sequelize.sync();
db.sequelize = sequelize

module.exports = db
