require('dotenv').config();

const express = require('express');
const app = express();
const PORT = 1234;

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

require('./Book');
const Book = mongoose.model('Book');

const MLAB_KEY = process.env.MLAB_KEY;

app.use(bodyParser.json());

mongoose.connect("mongodb+srv://aaroncross:" + MLAB_KEY +
    "@testcluster-zbqkz.mongodb.net/test?retryWrites=true", () => {
    console.log('database connected!')
    console.log('**************');

});

app.get('/', (req, res) => {
    res.send('This is the "/GET" endpoint');
});

app.post('/book', (req, res) => {
    console.log("Book Created:");
    console.log(req.body);

    let newBook = {
        title: req.body.title,
        author: req.body.author,
        numberOfPages: req.body.numberOfPages,
        publisher: req.body.publisher
    };

    let book = new Book(newBook);

    book.save().then(()=> {
        console.log('book added to database')
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
    res.send('book added to database')
});

app.get('/books', (req, res) => {

    Book.find().then((books) => {
        res.json(books);
    }).catch(err => {
        if (err) {
            throw err;
        }
    })
});

app.get('/book/:id', (req, res) => {
    Book.findById(req.params.id).then((book) => {
        if (book) {
            res.json(book)
        } else {
            res.sendStatus(404)
        }
    }).catch(err => {
        if (err) {
            throw err;
        }
    })
});

app.listen(PORT, () => {
    console.log('**************');
    console.log('connected on PORT: ' + PORT + ' BOOK SERVICE');
    console.log('**************');

});

