const mongoose = require("mongoose")

const gigSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    userid: {
        type: String,
        required: true
    }
    ,
    desc: {
        type: String,
        required: true
    }
    ,
    cats: {
        type: String,
        required: true
    }
    ,
    servicetitle: {
        type: String,
        required: true
    },

    shortdesc: {
        type: String,
        required: true
    },
    deltime: {
        type: Number,
        required: true
    },
    revnum: {
        type: Number,
        required: true
    },

    price: {
        type: Number,
        required: true
    }

})
module.exports = mongoose.model('Gig', gigSchema)