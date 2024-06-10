const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer  = require('multer')
require('dotenv').config()

const app = express();
const port = 3030;

const upload = multer({ dest: 'uploads/' }) //cartella di destinazione per i file caricati su server

const start = require('./db')
start()

//middleware
const logger = require('./middlewares/logger');

app.use(cors())
app.use(express.json())
app.use(logger)

// const error = require('./middlewares/error');

const authorRoutes = require('./routes/author/authorRoutes');
const blogPostRoutes = require('./routes/blogPost/blogRoutes');
const loginRoutes = require('./routes/login');
const emailRoutes = require('./routes/email/sendEmail')

app.use('/', authorRoutes);
app.use('/', blogPostRoutes);
app.use('/', loginRoutes);
app.use('/', emailRoutes);

// app.use(error.errorHandler);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})