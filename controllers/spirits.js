const ErrorResponse = require("../utilities/errorResponse");
const asyncHandler = require("../middleware/async");
const Spirits = require("../models/sp_model");

//@description  Get all spirits
//routes        GET /api/v1/spirits
//routes        GET /api/v1/cocktails/:cocktailid/spirits
//access        public
exports.getAllSpirits = asyncHandler(async (req, res, next) => {
    let query;

    if (req.params.cocktailid) {
        query = Spirits.find({ cocktail_id: req.params.cocktail_id});
    } else {
        query = Spirits.find();
    }

    const spirits = await query;

    res.status(200).json({
        success: true,
        count: spirits.length,
        data: spirits,
    });
});