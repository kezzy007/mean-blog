const express = require('express');
const router = express.Router();
const tagsModel = require('./../models/tags');
const categoriesModel = require('./../models/categories');
const postsModel = require('./../models/posts');


router.post('/tags', (req, res) => {

    tagsModel.getAllTags().then((tags) => {

        return res.json({success: true, tags: tags});

    }).catch(err => {

        if(err) throw err;

    });

});

router.post('/tags-and-categories', (req, res) => {

    const tagsPromise = tagsModel.getAllTags();
    const categoriesPromise = categoriesModel.getAllCategories();


    Promise.all([tagsPromise, categoriesPromise]).then((result) => {

        return res.json({ success: true, tags: result[0], categories: result[1] });

    }).catch(err => {

        if(err) throw err;

    });

});

router.post('/add-tag', (req, res) => {

    new tagsModel(req.body.tag).save((err, tag) => {

        console.log(tag);

        if(err) throw err;

        return res.json({success: true, tag: tag});

    });

});

router.post('/categories', (req, res) => {

    categoriesModel.getAllCategories().then((categories) => {

        return res.json({success: true, categories: categories});

    }).catch(err => {

        if(err) throw err;

    });;

});

router.post('/add-category', (req, res) => {

    new categoriesModel(req.body.category).save((err, category) => {

        if(err) throw err;

        return res.json({success: true, category: category});

    });

});


router.post('/save-post', (req,res) => {

    const postSavePromise = new postsModel(req.body.formObject).save();

    postSavePromise.then( result => {

        return res.json({ success: true, postData: result });

    })
    .catch(err => {
        throw err;
    });

});

module.exports = router;