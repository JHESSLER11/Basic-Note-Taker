const express = require('express');
const app = express()
const path = require('path');
//const db = require('./db/db.json')


const PORT = process.env.PORT || 3001;

// handles post request 
app.use(express.json());
app.use(express.urlencoded( {
    extended: true 
}));

// handles in coming js,css, and images
app.use(express.static('public'));

// get notes.html file
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

// get index.html file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});


app.post('/api/notes', (req, res) => {
    let results = notes;
    res.json(results);
})

// runs the server
app.listen(PORT, () => {
    console.log(`API server now on ${PORT}!`)
})