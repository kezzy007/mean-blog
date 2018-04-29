const mongoose = require('mongoose');

const TagsSchema = mongoose.Schema({
    'name': {
        type: String,
        required: true
    },
    'slug': {
        type: String,
        required: true
    }
});

const Tags = module.exports = mongoose.model('Tags', TagsSchema);

module.exports.getAllTags = (callback) => {

    Tags.find({},callback);

}