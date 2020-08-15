const express = require("express")
const multer = require("multer")
const posts = express.Router()
const cors = require("cors")
const path = require('path')
var db = require('../models/index');

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
posts.use(cors())

// GET ALL POST
posts.get('/list', (req, res, next) => {

    db.post.findAll({ where: {},include:[db.user,db.media]})
        .then(posts => {
            res.json(posts)
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

posts.get('/users/:id', (req, res, next) => {
    db.post.findAll({ where: {user_id: req.params.id}, include: []})
        .then(posts => {
            res.json(posts)
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

// CREATE POST
posts.post('/create',upload.single('file'), (req, res, next) => {
    if (!req.body.titre || !req.body.content || !req.body.userId) {
        res.status(400)
        res.json({
            error: 'Bad Data'
        })
    } else {
        let media = {}
        if(req.file){
        
             media = {
                name: req.file.originalname ,
                path: req.file.path ,
                type: req.file.mimetype,
                   
            }
        }

     

        const postData = req.body
        
 
        db.post.create(postData)
            .then((post) => {
                media.postId = post.id
                db.media.create(media)
                .then(() => {
                    res.send('POST Added!')
                })
                .catch(err => {
                    res.send('error: ' + err)
                })
            })
            .catch(err => {
                res.send('error: ' + err)
            })
    }
})

//SHOW POST DETAILS
posts.get('/details/:slug', (req, res, next) => {
    
    db.post.findOne({
        where: {
            slug: req.params.slug
        },
        include: [db.user]
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
    db.post.destroy({
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
    
    db.post.findAll({
        where: {
            id: req.params.id
        } , include : [db.user,db.media]
        
        
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
        db.post.update(
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
    db.post.findAll({
        where: {
            userId: req.params.userId
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
