const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    cover: {
        type: String,
        required: true,
        default: 'https://picsum.photos/200/300',
    },
    readTime: {
        value: {
            type: Number,
            required: false
        },
        unit: {
            type: String,
            required: false
        }
    },
    author: {
        type: String,
        required: true,
        lowercase: true
    },
    content: {
        type: String,
        required: true
    }
}, {timestamps: true, strict: true})

const blogPostModel = mongoose.model('BlogPost', blogPostSchema);
module.exports = blogPostModel;