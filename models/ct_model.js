const mongoose = require('mongoose');

// Mongoose Schema
const CocktailSchema = new mongoose.Schema({
    name: {
        type: String,
        isRequired: [true, 'Name of cocktail is required']
    },
    origin: {
        type: String,
        isRequired: false,
    },
    description: {
        type: String,
        isRequired: true,
    },
    procedure: {
        type: String,
        isRequired: true,
    },
    spirit_name: {
        type: [String],
        isRequired: true
    },
    mixer_name: {
        type: [String],
        isRequired: true
    },
    garnish_name: {
        type: String,
        isRequired: false
    },
    spiritID: {
        type: [mongoose.Types.ObjectId],
        isRequired: true,
        unique: true
    },
    mixerID: {
        type: [mongoose.Types.ObjectId],
        isRequired: true,
        unique: true
    },
    garnishID: {
        type: mongoose.Types.ObjectId,
        isRequired: true,
        unique: true
    },
    photo: {
        type: String,
        default: 'no-photo.jpg'
    }
})

module.exports = mongoose.model('Cocktail', CocktailSchema);
