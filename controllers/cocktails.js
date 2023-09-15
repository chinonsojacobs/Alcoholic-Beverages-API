const ErrorResponse = require('../utilities/errorResponse');

const Cocktails = require('../models/ct_model');

//@description  Get all cocktails
//routes        GET /api/v1/cocktails
//access        public
exports.getCocktails = async(req, res, next) => {
    try {
        const cocktails = await Cocktails.find();

        res.status(200).json({ success:true, count: cocktails.length, data:cocktails });
    } catch (err) {
        next(err);
    }
};

//@description  Get a single cocktail
//routes        GET /api/v1/cocktails:id
//access        public
exports.getSingleCocktail = async(req, res, next) => {
    try {
        const cocktail = await Cocktails.findById(req.params.id);

        if (!cocktail) {
            return next(new ErrorResponse(`Cocktail not found with id: ${req.params.id}`, 404));
        }

        res.status(200).json({ success:true, data:cocktail });
    } catch (err) {
        next(err);
    }
};

//@description  Add new cocktail
//routes        POST /api/v1/cocktails
//access        private
exports.addCocktail = async(req, res, next) => {
    try {
        const cocktails = await Cocktails.create(req.body)

        res.status(201).json({
            success:true,
            data:cocktails
    })
    } catch (err) {
        next(err);
    }
};

//@description  Update cocktail
//routes        PUT /api/v1/cocktails/:id
//access        private
exports.updateCocktail = async(req, res, next) => {
    try {
        const cocktail = await Cocktails.findByIdAndUpdate(req.params.id, req.body, { new: true , runValidators: true });

        if (!cocktail) {
            return next(new ErrorResponse(`Cocktail not found with id: ${req.params.id}`, 404));
        }

        res.status(200).json({ success:true, data:cocktail });
    } catch (err) {
        next(err);
    }
};

//@description  Delete cocktail
//routes        DELETE /api/v1/cocktails/:id
//access        private
exports.deleteCocktails = async(req, res, next) => {
    try {
        const cocktail = await Cocktails.findByIdAndDelete(req.params.id)

        if (!cocktail) {
            return next(new ErrorResponse(`Cocktail not found with id: ${req.params.id}`, 404));
        }

        res.status(200).json({ success:true, data:{} });
    } catch (error) {
        next(err);
    }
};
