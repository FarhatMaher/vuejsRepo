const express = require("express")
const comments = express.Router()
const cors = require("cors")

const Post = require("../models/Post")
const User = require("../models/User")
const Comment = require("../models/Comment")


comments.use(cors())

// GET ALL COMMENTS
comments.get('/list', (req, res, next) => {

    Comment.findAll({ where: {}, include: []})
        .then(comments => {
            res.json(comments)
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

// ADD COMMENT
comments.post('/add', (req, res, next) => {
    if (!req.body.user_id || !req.body.post_id || !req.body.comments) {
        res.status(400)
        res.json({
            error: 'Bad Data'
        })
    } else {
        const commentData = {
            user_id: req.body.user_id,
            post_id: req.body.post_id,
            comments: req.body.comments,
            status: 1
        }

        Comment.create(commentData)
            .then(() => {
                res.send('COMMENT Added!')
            })
            .catch(err => {
                res.send('error: ' + err)
            })
    }
})


// Delete Comment
comments.delete('/:id', (req, res, next) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(() => {
            res.send('Comment deleted!')
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

// GET Comments by PostId
comments.get('/byPost/:postId', (req, res, next) => {

    User.hasMany(Comment, {foreignKey: 'user_id'})
    Comment.belongsTo(User, {foreignKey: 'user_id'})
    Comment.findAll({
        where: {
            post_id: req.params.postId
        }, include :[User]
    })
        .then((result) => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})
// GET Comments by UserId
comments.get('/byUser/:userId', (req, res, next) => {
    Comment.findAll({
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




module.exports = comments
