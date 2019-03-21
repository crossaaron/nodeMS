require('dotenv').config();

const express = require('express');
const app = express();
const PORT = 1234;

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
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
    console.log(req.body);
    res.send('Testing Book route')
});

app.listen(PORT, () => {
    console.log('**************');
    console.log('connected on PORT: ' + PORT + ' BOOK SERVICE');
    console.log('**************');

});

