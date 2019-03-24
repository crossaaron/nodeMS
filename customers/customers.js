require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 1234;
const MLAB_KEY = process.env.MLAB_KEY;
const bodyParser = require('body-parser');

app.use(bodyParser.json());


mongoose.connect("mongodb+srv://aaroncross:" + MLAB_KEY +
    "@testcluster-zbqkz.mongodb.net/test?retryWrites=true", () => {
    console.log('database connected!')
    console.log('**************');

});

require('./Customer')
const Customer = mongoose.model('Customer');

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

app.listen(PORT, () => {
    console.log("Customer Service Server Up!")
});