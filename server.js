const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
const notesDb = require("./db/db.json")

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

// get notes
app.get('/api/notes', (req, res) => {
    res.json(notesDb);
})

// runs the server
app.listen(PORT, () => {
    console.log(`API server now on ${PORT}!`)
})