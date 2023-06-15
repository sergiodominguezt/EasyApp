const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    message: {
        required: true,
        type: String
    },
    creationDate: {
        required: true,
        type: Date
    }

})

module.exports = mongoose.model('Post', dataSchema, 'posts')