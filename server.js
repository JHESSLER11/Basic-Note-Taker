const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const notesDb = require("./db/db.json");
const PORT = process.env.PORT || 3001;

console.log(notesDb)


// handles post request 
app.use(express.json());
app.use(express.urlencoded( { extended: true }));

// handles in coming js,css, and images
app.use(express.static('public'));

// get notes
app.get("/api/notes", (req, res) => {
    res.json(notesDb);
    console.log(notesDb + 'hello')
});

// get index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

// get notes.html file
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

// get index.html file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});


console.log(notesDb)
// adds notes to json file
app.post("/api/notes", (req, res) => {
    
    let saveNote = req.body;
    
    notesDb.push(saveNote);

    // adds id number to each note
    let number = 1
    notesDb.forEach((note) => {
        note.id = number;
        number++;
        return notesDb;
    })
    console.log(notesDb)

    //writes database 
    writeToDataBase(notesDb);

    res.json(saveNote);

});

app.delete("/api/notes", (res, req) => {

    for (let index = 0; index < notesDb.length; index++) {
       
        let notes = notesDb
        
    }
    // notesDb.forEach((note) => {
    //     console.log(note + 'hello2')
    //     if (note.id == req.params.id) {
    //         notesDb.splice(1);
    //     }
    // });

    writeToDataBase(notesDb)

    res.json(notesDb)
});

// runs the server
app.listen(PORT, () => {
    console.log(`API server now on ${PORT}!`)
});

//write to database function 
const writeToDataBase = (notesDb) => {
    notesDb = JSON.stringify(notesDb)
    fs.writeFile('./db/db.json', notesDb, error => {
        if (error) {
            return console.log(error);
        } else {
            console.log("notes added!")
        }
    })
};