const mongoose = require('mongoose');

mongoose.model('Order', {
    CustomerID: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    BookID: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    initialDate: {
        type: Date,
        required: false
    },
    deliveryDate: {
        type: Date,
        required: false
    }
});