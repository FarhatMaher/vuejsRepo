const express = require("express")
const multer = require("multer")
const posts = express.Router()
const cors = require("cors")
const path = require('path')
/*const upload = multer({
    dest: './uploads/'
})*/
var fileUploadName;
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/images')
    },
    filename: function (req, file, cb) {
        this.fileUploadName = Date.now() + path.extname(file.originalname)
        cb(null,this.fileUploadName )
    }
})

var upload = multer({ storage: storage })
const Post = require("../models/Post")
const User = require("../models/User")
posts.use(cors())

// GET ALL POST
posts.get('/list', (req, res, next) => {
    User.hasMany(Post, {foreignKey: 'user_id'})
    Post.belongsTo(User, {foreignKey: 'user_id'})
    Post.findAll({ where: {}, include: [User]})
        .then(posts => {
            res.json(posts)
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

posts.get('/users/:id', (req, res, next) => {
    Post.findAll({ where: {user_id: req.params.id}, include: []})
        .then(posts => {
            res.json(posts)
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

// CREATE POST
posts.post('/create',upload.single('file'), (req, res, next) => {
    if (!req.body.label || !req.body.description || !req.body.user_id) {
        res.status(400)
        res.json({
            error: 'Bad Data'
        })
    } else {
        var label = req.body.label;
        var slug = label.replace(/\s/g, "-");
        var pathing='';
        if(req.file){
            pathing = req.file.filename;
        }

        const postData = {
            label: req.body.label,
            slug: slug,
            description: req.body.description,
            post_type: req.body.post_type,
            path: pathing,
            status: 1,
            user_id: req.body.user_id,
        }
        Post.create(postData)
            .then(() => {
                res.send('POST Added!')
            })
            .catch(err => {
                res.send('error: ' + err)
            })
    }
})

//SHOW POST DETAILS
posts.get('/details/:slug', (req, res, next) => {
    User.hasMany(Post, {foreignKey: 'user_id'})
    Post.belongsTo(User, {foreignKey: 'user_id'})
    Post.findOne({
        where: {
            slug: req.params.slug
        },
        include: [User]
    })
        .then(post => {
            res.send(post)
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

// Delete POST
posts.delete('/:id', (req, res, next) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(() => {
            res.send('POST deleted!')
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

// getone POST
posts.get('/:id', (req, res, next) => {
    User.hasMany(Post, {foreignKey: 'user_id'})
    Post.belongsTo(User, {foreignKey: 'user_id'})
    Post.findAll({
        where: {
            id: req.params.id
        } , include : [User]
        
        
    })
        .then((result) => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})


// Update POST
posts.put('/update/:id', (req, res, next) => {
    if (!req.body.label || !req.body.description || !req.body.path || !req.body.user_id) {
        res.status(400)
        res.json({
            error: 'Bad Data'
        })
    } else {
        var label = req.body.label;
        var slug = label.replace(/\s/g, "-");
        const udpateData = {
            label: req.body.label,
            slug: slug,
            description: req.body.description,
            post_type: req.body.post_type,
            path: req.body.path,
            status: 1,
            user_id: req.body.user_id,
        }
        Post.update(
            {udpateData},
            { where: { id: req.params.id } }
        )
            .then(() => {
                res.send('POST Updated!')
            })
            .error(err => handleError(err))
    }
})


// GET Comments by UserId
posts.get('/byUser/:userId', (req, res, next) => {
    Post.findAll({
        where: {
            user_id: req.params.userId
        }
    })
        .then((result) => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

module.exports = posts
