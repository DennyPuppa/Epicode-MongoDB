const express = require('express');
const login = express.Router();

//model
const authorsModel = require('../models/author');

login.post('/login', async (req, res) => {
    const user = await authorsModel.findOne({email: req.body.email})
    if(!user){
        return res.status(404).send({
            message: 'Utente non esistente'
        })
    }
    if(req.body.lastName !== user.lastName){
        return res.status(404).send({
            message: 'Last Name non valido'
        }) 
    }
    res.status(200).send('Accesso eseguito')
})

module.exports = login;