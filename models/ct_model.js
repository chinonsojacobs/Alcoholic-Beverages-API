const mongoose = require('mongoose');

// Mongoose Schema
const CocktailSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Name of cocktail is required']
    },
    origin: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: [true, 'Description of cocktail is required']
    },
    procedure: {
        type: String,
        required: [true, 'Cocktail procedure is required']
    },
    spirit_name: {
        type: [String],
        required: [true, 'Spirits used in cocktail is required']
    },
    mixer_name: {
        type: [String],
        required: false
    },
    garnish_name: {
        type: [String],
        required: false
    },
    photo: {
        type: String,
        default: 'no-photo.jpg'
    }
})

module.exports = mongoose.model('Cocktail', CocktailSchema);
