const mongoose = require('mongoose')

const podSchema = new mongoose.Schema({
    _id:{
        required: false,
        type: String
        
    },
    podnumber:{
        required: false,
        type: String
    },
    podarea: {
        required: false,
        type: String
    },
    podcontactname:{
        required: false,
        type: String
    },

    poddate:{
        required: false,
        type: String
    },

    podcreation: {
        required: false,
        type: String
    },

    trackingNumber: {
        required: false,
        type: String
    },
    trackingNumber2: {
        required: false,
        type: String
    },
    trackingNumber3: {
        required: false,
        type: String
    },
    trackingNumber4: {
        required: false,
        type: String
    },
    trackingNumber5: {
        required: false,
        type: String
    },
    trackingNumber6: {
        required: false,
        type: String
    },
    trackingNumber7: {
        required: false,
        type: String
    },
    trackingNumber8: {
        required: false,
        type: String
    },
    trackingNumber9: {
        required: false,
        type: String
    },
    trackingNumber10: {
        required: false,
        type: String
    },
    trackingNumber11: {
        required: false,
        type: String
    },
    trackingNumber12: {
        required: false,
        type: String
    },
    trackingNumber13: {
        required: false,
        type: String
    },
    trackingNumber14: {
        required: false,
        type: String
    },
    trackingNumber15: {
        required: false,
        type: String
    },
    trackingNumber16: {
        required: false,
        type: String
    },
    trackingNumber17: {
        required: false,
        type: String
    },
    trackingNumber18: {
        required: false,
        type: String
    },
    trackingNumber19: {
        required: false,
        type: String
    },
    trackingNumber20: {
        required: false,
        type: String
    },


    podaddress: {
        required: false,
        type: String
    },
    poddriver: {
        required: false,
        type: String
    },
    podprice: {
        required: false,
        type: String
    },
    podremarks: {
        required: false,
        type: String
    }

})

module.exports = mongoose.model('Pod', podSchema)