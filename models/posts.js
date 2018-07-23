const mongoose = require('mongoose');
const mongooseTimestamps = require('mongoose-timestamp');

const PostsSchema = mongoose.Schema({
    'category': {
        type: Object,
        required: true
    },
    'title': {
        type: String,
        required: true
    },
    'slug': {
        type: String,
        required: true
    },
    'description': {
        type: String,
        required: false
    },
    'summary': {
        type: String,
        required: false
    },
    'content': {
        type: String,
        required: true
    },
    'status': {
        type: String,
        required: true
    },
    'comments': {
        type: Boolean,
        required: true,
        default: true
    },
    'featured': {
        type: Boolean,
        required: true
    },
    'tags': {
        type: Array,
        required: false
    }
});

PostsSchema.plugin(mongooseTimestamps);

const Posts = module.exports = mongoose.model('Posts', PostsSchema);

module.exports.getAllPublishedPosts = () => {

    return Posts.find({status: {$ne: 'draft'} });

};