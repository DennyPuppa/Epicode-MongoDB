const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const { blogPostSchema, commentsSchema} = require('../../models/blogPost');

const validateBody = require('../../middlewares/validate_post')

const authMiddleware = require('../../middlewares/authMiddleware');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY
})

const cloudStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'coverBlogPost',
        format: async (req, file) => 'png',
        public_id: (req, file) => file.name
    }
})

const cloudUpload = multer({ storage: cloudStorage })

router.get('/blogpost', async (req, res) => {
    const blogPost = await blogPostSchema.find();
    res.status(200).json(blogPost);
})

router.get('/blogpost/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const post = await blogPostSchema.findById(id)
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.post('/blogpost', [authMiddleware, cloudUpload.single('coverImg')], async (req, res, next) => {
    const newBlogPost = new blogPostSchema({
        category: req.body.category,
        title: req.body.title,
        cover: req.file.path,
        readTime: {
            value: req.body.time,
            unit: 'min'
        },
        author: req.body.author,
        content: req.body.title,
    });
    try {
        const dbArticle = await newBlogPost.save();
        res.status(201).json(dbArticle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.put('/blogpost/:id', async (req, res) => {
    const id = req.params.id;
    const obj = req.body;
    try {
        const postUpdate = await blogPostSchema.findByIdAndUpdate(id, obj)
        res.status(200).json(postUpdate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.delete('/blogpost/:id', async (req, res) => {

    const id = req.params.id;
    try {
        await blogPostSchema.findByIdAndDelete(id);
        res.status(200).json({ message: 'succes' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

})

module.exports = router;