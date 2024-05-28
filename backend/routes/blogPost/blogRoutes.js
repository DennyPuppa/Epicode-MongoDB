const express = require('express');
const router = express.Router();

const blogPostModel = require('../../models/blogPost');

const validateBody = require('../../middlewares/validate_post')

router.get('/blogpost', async (req, res) => {
    const blogPost = await blogPostModel.find();
    res.status(200).json(blogPost);
})

router.get('/blogpost/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const post = await blogPostModel.findById(id)
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.post('/blogpost', validateBody, async (req, res) => {
    const obj = req.body;
    try {
        const newBlogArticle = new blogPostModel(obj)
        const dbArticle = await newBlogArticle.save();
        res.status(201).json(dbArticle);
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
})

router.put('/blogpost/:id', async (req, res) => {
    const id = req.params.id;
    const obj = req.body;
    try {
        const postUpdate = await blogPostModel.findByIdAndUpdate(id, obj)
        res.status(200).json(postUpdate);
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
})

router.delete('/blogpost/:id', async (req, res) => {

    const id = req.params.id;
    try {
        await blogPostModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'succes' });
    } catch (error) {
        res.status(500).json({ message: err.message });
    }

})

module.exports = router;