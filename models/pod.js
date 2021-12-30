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

    podtaskid: {
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