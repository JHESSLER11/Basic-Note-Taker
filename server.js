const express = require('express');
const app = express()
const path = require('path');
const db = require('./db/db.json')
const notes = require('./public/notes.html')

const PORT = process.env.PORT || 3001;


app.use(express.json());
app.use(express.urlencoded( {
    extended: true 
}));
app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

app.listen(PORT, () => {
    console.log(`API server now on ${PORT}!`)
})