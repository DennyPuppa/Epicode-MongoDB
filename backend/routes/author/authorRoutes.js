const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

//model
const authorsModel = require('../../models/author');

//middlewares
const validateBody = require('../../middlewares/validate_user')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY
})

const cloudStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'avatarAuthor',
        format: async (req, file) => 'png',
        public_id: (req, file) => file.name
    }
})

const cloudUpload = multer({ storage: cloudStorage })


router.post('/upload/cloud', cloudUpload.single('avatarImg'), validateBody, async (req, res) => {
    try {
        res.status(200).json({source: req.file.path})
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/', (req, res) => {
    res.json({
        message: "Hello World!"
    })
})

router.get('/authors', async (req, res) => {
    const authors = await authorsModel.find();
    res.status(200).json(authors);
})

router.get('/authors/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const authors = await authorsModel.findById(id)
        res.status(200).json(authors);
    } catch (error) {
        // res.status(500).json({ message: err.message });
        next(error)
    }
})

router.post('/authors', cloudUpload.single('avatarImg'), async (req, res, next) => {
    const newAuthor = new authorsModel({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        date: req.body.date,
        avatar: req.file.path,
    })
    try {
        const dbAuthors = await newAuthor.save();
        res.status(201).json(dbAuthors);
    } catch (error) {
        // res.status(500).json({ message: err.message });
        next(error)
    }
})

router.put('/authors/:id', async (req, res, next) => {
    const id = req.params.id;
    const obj = req.body;
    try {
        const authorUpdate = await authorsModel.findByIdAndUpdate(id, obj)
        res.status(200).json(authorUpdate);
    } catch (error) {
        // res.status(500).json({ message: err.message });
        next(error)
    }
})

router.delete('/authors/:id', async (req, res, next) => {

    const id = req.params.id;
    try {
        await authorsModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'succes' });
    } catch (error) {
        // res.status(500).json({ message: err.message });
        next(error)
    }

})

module.exports = router;