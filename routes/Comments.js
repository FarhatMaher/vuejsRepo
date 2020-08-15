const express = require("express")
const comments = express.Router()
const cors = require("cors")

var db = require('../models/index');

comments.use(cors())

// GET ALL COMMENTS
comments.get('/list', (req, res, next) => {

    db.comment.findAll({ where: {}, include: []})
        .then(comments => {
            res.json(comments)
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

// ADD COMMENT
comments.post('/add', (req, res, next) => {
    if (!req.body.userId || !req.body.postId || !req.body.contenu) {
        res.status(400)
        res.json({
            error: 'Bad Data'
        })
    } else {
        const commentData = {
            userId: req.body.userId,
            postId: req.body.postId,
            comments: req.body.contenu,
            status: 1
        }

        db.comment.create(commentData)
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
    db.comment.destroy({
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


    db.comment.findAll({
        where: {
            postId: req.params.postId
        }, include :[db.user]
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
    db.comment.findAll({
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

// Update Comment
comments.put('/:id', (req, res, next) => {

     newComment = req.body
    if (!req.body.comments) {
        res.status(400)
        res.json({
            error: 'Bad Data'
        })
    } else {
        db.comment.update(
            {newComment},
            { where: { id: req.params.id } }
        )
            .then(() => {
                res.send('comment Updated!')
            })
            .error(err => handleError(err))
    
}
})





module.exports = comments
