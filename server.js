var express = require("express")
var cors = require("cors")
var bodyParser = require("body-parser")
var passport = require("passport")
var app = express()
var port = process.env.PORT || 3000
var path = require("path")
var db = require(__dirname + '/models/index');

// Sync the database models
db.sequelize.sync({
  // force: true,
  alter: true
});
app.use(bodyParser.json())
app.use(cors())
app.use(
    bodyParser.urlencoded({ extended: false})
)
app.use(passport.initialize());

app.use(express.static(path.join(__dirname, "./")));


var Users = require("./routes/Users")
var Posts = require("./routes/Posts")
var Comments = require("./routes/Comments")

app.use("/users", Users)
app.use("/posts", Posts)
app.use("/comments", Comments)

app.listen(port, function () {
    console.log("Server is runing on port "+ port)
})
