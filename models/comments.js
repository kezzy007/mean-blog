const mongoose = require('mongoose');
const mongooseTimestamps = require('mongoose-timestamp');

const CommentsSchema = mongoose.Schema({
    'post_id': {
        type: String,
        required: true
    },
    'comment': {
        type: String,
        required: true
    },
    'user': {
        type: Object,
        required: true
    }
});

CommentsSchema.plugin(mongooseTimestamps);

const Comments = module.exports = mongoose.model('Comments', CommentsSchema);
