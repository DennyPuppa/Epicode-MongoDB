const mongoose = require('mongoose');

const authorsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 50
    },
    lastName: {
        type: String,
        required: true,
        min: 3
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    }
}, {timestamps: true, strict: true})

const authorsModel = mongoose.model('Authors', authorsSchema);
module.exports = authorsModel;