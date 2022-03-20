const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
const notesDb = require("./db/db.json")

console.log(notesDb)

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
    res.json(notesDb)
})
console.log(notesDb)
// adds notes to json file
app.post('/api/notes', (req, res) => {
    console.log(notesDb)
    //notesDb = JSON.parse(notesDb);

    // adds id number
    req.body.id = JSON.stringify(notesDb[notesDb.length -1].id + 1);

    notesDb.push(req.body);
    
    console.log(notesDb)
    
    
    //notesDb = JSON.stringify(notesDb);
    writeToFile(notesDb);

    res.json(req.body)

})

// runs the server
app.listen(PORT, () => {
    console.log(`API server now on ${PORT}!`)
})

// write to file function 
const writeToFile = (notesDb) => {
    fs.writeFile('./db/db.json', notesDb = JSON.stringify(notesDb), error => {
        if (error) {
            return console.log(error);
        } else {
            console.log("notes added!")
        }
    })
}