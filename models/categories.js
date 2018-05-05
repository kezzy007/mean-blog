const mongoose = require('mongoose');

const CategoriesSchema = mongoose.Schema({

    'name': {
        type: String,
        required: true
    },
    'slug': {
        type: String,
        required: true
    },

});

const Categories = module.exports = mongoose.model('Categories', CategoriesSchema);

module.exports.getAllCategories = () => {

    return Categories.find({});

};