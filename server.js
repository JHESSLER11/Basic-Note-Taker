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
    res.sendFile(path.json(__dirname, './db/db.json'));
})

// adds notes to json file
app.post('/api/notes', (req, res) => {
    req.body.id = notesDb.length;

    notesDb.push(req.body);

    writeToFile();

})

// runs the server
app.listen(PORT, () => {
    console.log(`API server now on ${PORT}!`)
})

// write to file function 
const writeToFile = (notesDb) => {
    fs.writeFile('./db/db.json', JSON.stringify(notesDb), error => {
        if (error) {
            return console.log(error);
        } else {
            console.log("notes added!")
        }
    })
}