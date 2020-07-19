const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    comentario: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const Comment = mongoose.model('comments', commentSchema);

module.exports = Comment;