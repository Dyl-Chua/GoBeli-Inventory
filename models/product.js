const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title:{
        required: false,
        type: String
    },

    description:{
        required: false,
        type: String
    },

    quantityonhand: {
        required: false,
        type: String
    },

    restock: {
        required: false,
        type: String
    },

    createdAt:{
        type: Date,
        default: Date.now
    },

    sold: {
type: String,
require: false
    },

payment: {
    type: String,
    required: false
},

remarks: {
    required: false,
    type: String
}

})

module.exports = mongoose.model('Product', productSchema)