require('dotenv').config();

const express = require('express');
const app = express();
const PORT = 1234;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const MLAB_KEY = process.env.MLAB_KEY;
const axios = require('axios');


require('./customers/Customer');
require('./books/Book');
require ('./orders/Order');

const Book = mongoose.model('Book');
const Customer = mongoose.model('Customer');
const Order = mongoose.model('Order');


app.use(bodyParser.json());

mongoose.connect("mongodb+srv://aaroncross:" + MLAB_KEY +
    "@testcluster-zbqkz.mongodb.net/test?retryWrites=true", {useNewUrlParser:true}, () => {
    console.log('database connected!');
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
            res.sendStatus(404);
        }
    }).catch(err => {
        if (err) {
            throw err;
        }
    })
});

app.delete('/book/:id', (req, res) => {
    Book.findOneAndRemove(req.params.id).then(() => {
        res.send('Book Removed!')
    }).catch(err => {
        if (err) {
            throw err;
        }
    })
});



app.post('/customer' , (req, res) => {
    let newCustomer = {
        name: req.body.name,
        age: req.body.age,
        address: req.body.address
    }

    let customer = new Customer(newCustomer)

    customer.save().then(() => {
        res.send('Customer Created')
    }).catch(err => {
        if (err) {
            throw err;
        }
    })
});

app.get('/customers', (req, res) => {
    Customer.find().then((customers) => {
        res.json(customers)
    }).catch((err) => {
        if (err) {
            throw err;
        }
    })
});

app.get('/customer/:id', (req, res) => {
    Customer.findById(req.params.id).then((customer) => {
        if (customer) {
            res.json(customer)
        } else {
            res.send('Invalid Id')
        }
    }).catch(err => {
        if (err) {
            throw err;
        }
    })
});

app.delete('/customer/:id', (req, res) => {
    Customer.findByIdAndRemove(req.params.id).then(() => {
        res.send('Customer Deleted')
    }).catch(err => {
        if (err) {
            throw err;
        }
    })
});

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
});

app.get('/order/:id', (req, res) => {
    Order.findById(req.params.id).then((order) => {
        if (order) {
            axios.get('http://localhost:1234/customer/' + order.CustomerID).then((response) => {
                let orderObject = {
                    orderID: req.params.id,
                    customerName: response.data.name,
                    bookTitle: ''
                };
                axios.get('http://localhost:1234/book/' + order.BookID).then((response) => {
                    orderObject.bookTitle = response.data.title;
                    res.json(orderObject);
                })
            })
        } else {
            res.send('Invalid Order')
        }
    })
});



app.listen(PORT, () => {
    console.log('**************');
    console.log('connected on PORT: ' + PORT + ' BOOK SERVICE');
    console.log('**************');

});

