const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config()

const app = express();
const port = 3030;
const dbName = 'test';

//middleware
app.use(cors())
app.use(express.json())

const authorsSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: true
    },
    lastName: {
        type: 'string',
        required: true
    },
    email: {
        type: 'string',
        required: true
    },
    date: {
        type: 'string',
        required: true
    },
    avatar: {
        type: 'string',
        required: true
    }
})

const authorsModel = mongoose.model('Authors', authorsSchema);

const blogPostSchema = new mongoose.Schema({
    category: {
        type: 'string',
        required: true,
    },
    title: {
        type: 'string',
        required: true,
    },
    cover: {
        type: 'string',
        required: true,
        default: 'https://picsum.photos/200/300',
    },
    readTime: {
        value: {
            type: 'number',
            required: false
        },
        unit: {
            type: 'number',
            required: false
        }
    },
    author: {
        type: 'string',
        required: true
    },
    content: {
        type: 'string',
        required: true
    }
})

const blogPostModel = mongoose.model('BlogPost', blogPostSchema)

app.get('/home', (req, res) => {
    res.json({
        message: "Hello World!"
    })
})

app.get('/authors', async (req, res) => {
    const authors = await authorsModel.find();
    res.status(200).json(authors);
})

app.get('/blogpost', async (req, res) => {
    const blogPost = await blogPostModel.find();
    res.status(200).json(blogPost);
})

app.get('/authors/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const authors = await authorsModel.findById(id)
        res.status(200).json(authors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

app.get('/blogpost/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const post = await blogPostModel.findById(id)
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

app.post('/authors', async (req, res) => {
    const obj = req.body;
    const newAuthors = new authorsModel(obj)
    const dbAuthors = await newAuthors.save();
    res.status(201).json(dbAuthors);
})

app.post('/blogpost', async (req, res) => {
    const obj = req.body;
    const newBlogArticle = new blogPostModel(obj)
    const dbArticle = await newBlogArticle.save();
    res.status(201).json(dbArticle);
})

app.put('/authors/:id', async (req, res) => {
    const id = req.params.id;
    const obj = req.body;
    try {
        const authorUpdate = await authorsModel.findByIdAndUpdate(id, obj)
        res.status(200).json(authorUpdate);
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
})

app.put('/blogpost/:id', async (req, res) => {
    const id = req.params.id;
    const obj = req.body;
    try {
        const postUpdate = await blogPostModel.findByIdAndUpdate(id, obj)
        res.status(200).json(postUpdate);
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
})

app.delete('/authors/:id', async (req, res) => {

    const id = req.params.id;
    try {
        await authorsModel.findByIdAndDelete(id);
        res.status(200).json({message: 'succes'});
    } catch (error) {
        res.status(500).json({ message: err.message });
    }

})

app.delete('/blogpost/:id', async (req, res) => {

    const id = req.params.id;
    try {
        await blogPostModel.findByIdAndDelete(id);
        res.status(200).json({message: 'succes'});
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
    
})

const start = async () => {
    try {

        //connection string
        await mongoose.connect('mongodb+srv://dennypuppa88:fcdJDSPYZmlPuAFT@cluster0.pjgweuy.mongodb.net/' + dbName)
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })

    } catch (err) {
        console.error(err)
    }
}
start();