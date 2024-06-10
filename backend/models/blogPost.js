const mongoose = require('mongoose');
const commentsSchema = new mongoose.Schema({
    comment:{
        type: 'string',
        required:true,
        }
},{timestamps:true,strict:true}) 

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
    },
    comments:[commentsSchema]
}, {timestamps: true, strict: true})

module.exports = {
    blogPostSchema: mongoose.model('BlogPost',blogPostSchema),
    commentsSchema: mongoose.model('commentsSchema', commentsSchema)
}