const express = require("express")
const users = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
var db = require('../models/index');

const authenticate = require("../authenticate");
users.use(cors())

//LIST USERS
//Get Task list
users.get("/list",(req, res) => {
    db.user.findAll()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.send("error" + err)
        })
})


//GET ONE USER
users.get('/details/:id',(req, res) => {
    db.user.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

//GET ONE USER
users.put('/update/:id',(req, res) => {

    
  
    const userTO = req.body
    db.user.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(function (user) {
      // Check if record exists in db
      if (user) {
        user.update(
            userTO
        )
        .then(function (data) {
            res.send(data)
        })
      }
    })
})


//REGISTER
users.post('/register',(req, res) => {
    const today = new Date()
    const userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role_id: req.body.role_id,
        created_at: today,
        updated_at: today
    }
    db.user.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash
                    db.user.create(userData)
                        .then(user => {
                            res.json({ status:'ok','mesage':'Registered' })
                        })
                        .catch(err => {
                            res.send('error: ' + err)
                        })
                })
            } else {
                res.json({ error: 'User already exists' })
            }
        })
        .catch(err => {
            res.send('error:: ' + err)
        })
})

//Login
users.post('/login', (req, res) => {
    db.user.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    let payload = { id: user.id };
                    let token = authenticate.getToken(payload)
                    res.status(200).json({token:token,id:user.id})
                }
            } else {
                res.status(400).json({ error: 'User does not exist' })
            }
        })
        .catch(err => {
            res.status(400).json({ error: err })
        })
})

users.delete('/:userId', async (req,res)=>{
const id = req.params.userId

let posts = await db.Post.findAll({
    where :{
        user_id: id
    }
})
const ids = posts.map(elem=>elem.id)

await db.Post.destroy({
    where: {
        id: ids
    }
});

db.user.destroy({
    where: {
    id:id
    }
}).
then(result=> {console.log(result)
res.status(200).json({success: true , message:"User deleted"})
}
)
.catch ( error => {
     res.status(500).json({message:"error de suppression"}),
console.log(error)} 
)
}); 


module.exports = users
