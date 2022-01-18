const mongoose = require('mongoose')
const { StringDecoder } = require('string_decoder')

const productSchema = new mongoose.Schema({
    _id:{
        required: false,
        type: String
    },
    
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
},

trackingNumber:{
    type: String
},
trackingNumber2:{
    type: String
},
trackingNumber3:{
    type: String
},
trackingNumber4:{
    type: String
},
trackingNumber5:{
    type: String
},
trackingNumber6:{
    type: String
},
trackingNumber7:{
    type: String
},
trackingNumber8:{
    type: String
},
trackingNumber9:{
    type: String
},
trackingNumber10:{
    type: String
},
trackingNumber11:{
    type: String
},
trackingNumber12:{
    type: String
},
trackingNumber13:{
    type: String
},
trackingNumber14:{
    type: String
},
trackingNumber15:{
    type: String
},
trackingNumber16:{
    type: String
},
trackingNumber17:{
    type: String
},
trackingNumber18:{
    type: String
},
trackingNumber19:{
    type: String
},
trackingNumber20:{
    type: String
}

})

module.exports = mongoose.model('Product', productSchema)