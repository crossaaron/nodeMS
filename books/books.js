const express = require('express');
const app = express();
const PORT = 1234;

app.get('/', (req, res) => {
    console.log(res);
    res.send('This is the "/GET" endpoint');
});

app.listen(PORT, () => {
    console.log('**************');
    console.log('connected on PORT: ' + PORT + ' BOOK SERVICE');
    console.log('**************');

});

