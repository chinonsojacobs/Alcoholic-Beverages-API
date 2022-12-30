const Cocktails = require('../models/ct_model');

//@description  Get all cocktails
//routes        GET /api/v1/cocktails
//access        public
exports.getCocktails = (req, res, next) => {
    res.status(200).json({ success: true, message: 'Get all Cocktails'});
};

//@description  Get a single cocktail
//routes        GET /api/v1/cocktails:id
//access        public
exports.getSingleCocktail = (req, res, next) => {
    res.status(200).json({ success: true, message: `Get single cocktail ${req.params.id}`});
};

//@description  Add new cocktail
//routes        POST /api/v1/cocktails
//access        private
exports.addCocktail = (req, res, next) => {
    res.status(200).json({ success: true, message: 'Add new cocktail'});
};

//@description  Update cocktail
//routes        PUT /api/v1/cocktails/:id
//access        private
exports.updateCocktail = (req, res, next) => {
    res.status(200).json({ success: true, message: `Update cocktail ${req.params.id}`});
};

//@description  Delete cocktail
//routes        DELETE /api/v1/cocktails/:id
//access        private
exports.deleteCocktails = (req, res, next) => {
    res.status(200).json({ success: true, message: `Delete cocktail ${req.params.id}`});
};
