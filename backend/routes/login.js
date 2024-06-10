const express = require('express');
const login = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');

//model
const authorsModel = require('../models/author');

login.post('/login', async (req, res) => {
    const author = await authorsModel.findOne({email: req.body.email});
    if(!author){
        return res.status(404).send({
            message: 'Utente non esistente'
        })
    }
    try {
        const validPassword = await bcrypt.compare(req.body.password, author.password);
        if (!validPassword) {
            return res.status(403).send('Username o Password non valida');
        }
        const token = jwt.sign({
            name: author.name,
            lastName: author.lastName,
            email: author.email,
            date: author.date,
            avatar: author.avatar
        },
            process.env.JWT_SECRET_KEY,
            {
            expiresIn: '30m'
        })
        res.status(200).json(token);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

login.get('/auth/googleLogin',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

login.get('/auth/callback', 
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  function(req, res, next) {
    // Successful authentication, redirect home.
    try {
        res.redirect('http://localhost:3000/')
    } catch(err) {
        next(err)
    }

    
  });

module.exports = login;