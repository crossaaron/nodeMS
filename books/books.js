require('dotenv').config();

const express = require('express');
const app = express();
const PORT = 1234;

const mongoose = require('mongoose');
const MLAB_KEY = process.env.MLAB_KEY;


mongoose.connect("mongodb+srv://aaroncross:" + MLAB_KEY + "@testcluster-zbqkz.mongodb.net/test?retryWrites=true", () => {
    console.log('database connected!')
    console.log('**************');

});

app.get('/', (req, res) => {
    console.log(res);
    res.send('This is the "/GET" endpoint');
});

app.listen(PORT, () => {
    console.log('**************');
    console.log('connected on PORT: ' + PORT + ' BOOK SERVICE');
    console.log('**************');

});

