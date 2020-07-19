const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    informacao: {
        type: String,
        required: true
    }
});

const Content = mongoose.model('contents', contentSchema);

module.exports = Content;