const express = require('express');
const router = express.Router();
const tagsModel = require('./../models/tags');


router.get('tags', (req, res) => {

    tagsModel.getAllTags((err, result) => {

        if(err) throw err;

        return res.json({success: true, tags: result});

    });

});

module.exports = router;