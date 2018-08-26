const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')

// Authentication modules
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/keys')

// Socket Object
var io = null;
var connections = [];
var userSocket = null;


// Models
const postsModel = require('../models/posts');
const categoriesModel =  require('../models/categories');
const commentsModel = require('../models/comments');
const tagsModel = require('../models/tags');
const userModel = require('../models/user')


signTokenWithUser = ({ _id, username, email, role }) => {

    // Create token
    let token = jwt.sign({ _id, username, email, role }, config.secret, {
        expiresIn: 604800 // 1 week,
    });

    return {'token': `bearer ${token}` };
}

returnPostsCategoriesCommentsTags = ( 
    postsPromise, 
    categoriesPromise,
    commentsPromise,
    tagsPromise,
    res
) => {

    Promise.all([
        postsPromise, 
        categoriesPromise,
        commentsPromise,
        tagsPromise
    ])
    .then((result) => {

        return res.json({
                         success: true, 
                         posts: result[0], 
                         categories: result[1],
                         comments: result[2],
                         tags: result[3]
                        });

    })
    .catch(err => {
        console.log(err)
        return res.json({ success: false })
    });

}

router.get('/categories/:categorySlug', async (req, res) => {

    const { categorySlug } = req.params

    const postsPromise = postsModel.find({ 'category.slug': categorySlug })
                                    .catch(err => {
                                        return res.json({ success: false })
                                    })
    const categoriesPromise = categoriesModel.getAllCategories();
    const commentsPromise = commentsModel.getAllComments();
    const tagsPromise = tagsModel.getAllTags();

    returnPostsCategoriesCommentsTags( 
        postsPromise, 
        categoriesPromise,
        commentsPromise,
        tagsPromise,
        res
    )

})

router.get('/tags/:tagSlug', async (req, res) => {

    const { tagSlug } = req.params

    const postsPromise = postsModel.find({ 'tags':{
                                                    $elemMatch: {
                                                        slug: tagSlug
                                                    }
                                                } 
                                         })
                                    .catch(err => {
                                        return res.json({ success: false })
                                    })
    const categoriesPromise = categoriesModel.getAllCategories();
    const commentsPromise = commentsModel.getAllComments();
    const tagsPromise = tagsModel.getAllTags();

    returnPostsCategoriesCommentsTags( 
        postsPromise, 
        categoriesPromise,
        commentsPromise,
        tagsPromise,
        res
    )

})

router.post('/register', async (req, res) => {

    const { user: { 
                    username, 
                    email, 
                    password 
                } 
            } = req.body


    const hashedUserPassword = await bcrypt.hash(password, 10)
                                        .catch( err => console.log(err) )

    if(!hashedUserPassword){
        return { success: false }
    }

    let newUser = new userModel({
                            username,
                            email,
                            password: hashedUserPassword        
                        })

    await newUser.save().catch( err => console.log(err) )

    const token = signTokenWithUser(newUser)

    const user = {
        username,
        email,   
        role: newUser.role
    }

    if(token){

        return res.json({
                    user,
                    ...token,
                    success: true
                })

    }

    return res.json({ success: false })
})

router.post('/authenticate', async (req, res) => {

    const { email, password } = req.body

    const user = await userModel.findOne({ 
                                            email 
                                        })
                                        
    if(user === null) return { success: false }

    const passwordMatches = await bcrypt.compare(password, user.password)

    let token = {}

    if(passwordMatches){
        token = await signTokenWithUser(user)
    }

    return res.json({ 
             ...token, 
             user, 
             success: (passwordMatches ? true : false )
            })    

})

router.get('/posts',(req, res) => {

    const postsPromise = postsModel.getAllPublishedPosts();
    const categoriesPromise = categoriesModel.getAllCategories();
    const commentsPromise = commentsModel.getAllComments();
    const tagsPromise = tagsModel.getAllTags();


    returnPostsCategoriesCommentsTags( 
        postsPromise, 
        categoriesPromise,
        commentsPromise,
        tagsPromise,
        res
    )
  

});

router.post('/save-comment', (req, res) => {

    new commentsModel(req.body.comment).save((err, comment) => {

        if(err) throw err;
        
        /**
         * To access the io in the routes
         */

        req.io.emit('user-commented', {comment: comment});


        return res.json({success: true, comment: comment});
    });

});


module.exports = router;



