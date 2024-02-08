const mongoose = require('mongoose');

const SpiritSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Spirit name is required'],
    },
    manufacturer: {
        type: String,
        required: [true , 'Spirit manufacturer is required'],
    },
    cocktail: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cocktail',
        required: true
    }
});

module.exports = mongoose.model('Spirit', SpiritSchema);