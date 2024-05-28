const express = require('express');
const router = express.Router();

//model
const authorsModel = require('../../models/author');

//middlewares
const validateBody = require('../../middlewares/validate_user')

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

router.post('/authors', validateBody, async (req, res, next) => {
    const obj = req.body;
    try {
        const newAuthors = new authorsModel(obj);
        const dbAuthors = await newAuthors.save();
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