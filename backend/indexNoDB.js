const express = require('express');
const cors = require('cors');

const app = express();
const port = 3030;

app.use(cors())
app.use(express.json())

let authors = [
    {id: 1, name: "John", lastName: "Doe", email: "j.doe@example.com"},
    {id: 2, name: "Mario", lastName: "Rossi", email: "m.rossi@example.com"},
];

app.get('/home', (req, res) => {
    res.json({
        message: "hello world!"
    })
})

app.get('/authors', (req, res) => {
    res.json(authors)
})

app.get('/authors/:id', (req, res) => {
    const id = req.params.id;
    let obj = authors.find(u => u.id === +id);
    res.json(obj);
})

app.post('/authors', (req, res) => {
    const obj = req.body;
    authors.push(obj);
    res.json({message: 'Utente inserito con successo'});
})

app.put('/authors/:id', (req, res) => {
    const id = req.params.id;
    const o = req.body;
    let obj = authors.find(u => u.id === +id);
    Object.assign(obj, o);
    res.json({message: 'Utente modificato con successo'});
})

app.delete('/authors/:id', (req, res) => {
    const id = req.params.id;
    authors = authors.filter(u => u.id !== +id)
    res.json({message: 'Utente eliminato con successo'});
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })