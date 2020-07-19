const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    informacao: {
        type: String,
        required: true
    }
})