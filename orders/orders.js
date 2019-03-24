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

require ('./Order');
const Order = mongoose.model('Order');

app.post('/order', (req, res) => {

    let newOrder = {
       CustomerID: mongoose.Types.ObjectId(req.body.CustomerID),
       BookID: mongoose.Types.ObjectId(req.body.BookID),
       initialDate: req.body.initialDate,
       deliveryDate: req.body.deliveryDate
   };

   let order = new Order(newOrder);

   order.save().then(() => {
       console.log('order added to database');

   }).catch((err) => {
       if (err) {
           throw err;
       }
   });
   res.send("order added!")
});

app.get('/orders', (req, res) => {
    Order.find().then((books) => {
        res.json(books)
    }).catch((err) => {
        if (err) {
            throw err;
        }

    })
})

app.listen(PORT, () => {
    console.log('Order Service Connected!')
});