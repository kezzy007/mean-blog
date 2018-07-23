const express = require('express');
const router = express.Router();

// Socket Object
var io = null;
var connections = [];
var userSocket = null;


// Models
const postsModel = require('../models/posts');
const categoriesModel =  require('../models/categories');
const commentsModel = require('../models/comments');

router.get('/posts', (req, res) => {

    const postsPromise = postsModel.getAllPublishedPosts();
    const categoriesPromise = categoriesModel.getAllCategories();
    const commentsPromise = commentsModel.getAllComments();

    Promise.all([
        postsPromise, 
        categoriesPromise,
        commentsPromise
    ])
    .then((result) => {

        return res.json({success: true, 
                         posts: result[0], 
                         categories: result[1],
                         comments: result[2]
                        });

    })
    .catch(err => console.log(err));

});

router.post('/save-comment', (req, res) => {

    new commentsModel(req.body.comment).save((err, comment) => {

        if(err) throw err;

        console.log('saved comment', comment);

        /**
         * To access the io in the routes
         */

        req.io.emit('user-commented', {comment: comment});


        return res.json({success: true, comment: comment});
    });

});


module.exports = router;



