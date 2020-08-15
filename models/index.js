var fs = require("fs");
var path = require("path");
var Sequelize = require('sequelize');



var sequelize = new Sequelize("db_groupomania", "root", "root", {
    dialect: "mysql",
    logging: true

});
var db = {};

fs.readdirSync(__dirname).filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  }).forEach(function(file) {
var model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
      console.log('Imported ' + model.name);
    db[model.name] = model;
  });

  Object.keys(db).forEach(function (modelName) {

    if (db[modelName].associate) {
    console.log("maherr" +db[modelName])
    db[modelName].associate(db);
    }
    });

    sequelize
.authenticate()
.then(() => {
console.log('Connection has been established successfully.');
})
.catch(err => {
console.error('Unable to connect to the database:', err);
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;