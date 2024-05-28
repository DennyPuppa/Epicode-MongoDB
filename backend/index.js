const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer  = require('multer')
require('dotenv').config()

const app = express();
const port = 3030;
const dbName = 'test';
const upload = multer({ dest: 'uploads/' }) //cartella di destinazione per i file caricati su server

//middleware
app.use(cors())
app.use(express.json())

const error = require('./middlewares/error');

const authorRoutes = require('./routes/author/authorRoutes');
const blogPostRoutes = require('./routes/blogPost/blogRoutes')
app.use(authorRoutes);
app.use(blogPostRoutes);

app.use(error.errorHandler);

const start = async () => {
    try {

        //connection string
        await mongoose.connect(process.env.MONGO_DB + dbName)
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })

    } catch (err) {
        console.error(err)
    }
}
start();