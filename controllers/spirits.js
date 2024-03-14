const ErrorResponse = require("../utilities/errorResponse");
const asyncHandler = require("../middleware/async");
const Spirits = require("../models/sp_model");
const Cocktails = require("../models/ct_model");

//@description  Get all spirits
//routes        GET /api/v1/spirits
//routes        GET /api/v1/cocktails/:cocktailid/spirits
//access        public
exports.getAllSpirits = asyncHandler(async (req, res, next) => {
    let query;

    if (req.params.cocktailid) {
        query = Spirits.find({ cocktail: req.params.cocktailid});
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

//@description  Get single spirit
//routes        GET /api/v1/spirits/:id
//access        public
exports.getSingleSpirit = asyncHandler(async (req, res, next) => {
    const spirit = await Spirits.findById(req.params.id)

    if (!spirit) {
        return next(
          new ErrorResponse(`Spirit not found with id: ${req.params.id}`, 404)
        );
      }

    res.status(200).json({ 
        success: true,
        data: spirit
     });
});

//@description  Add new spirit
//routes        POST /api/v1/cocktails/:cocktailid/spirits
//access        private
exports.addSpirit = asyncHandler(async (req, res, next) => {
    req.body.cocktail = req.params.cocktailid;

    const cocktail = await Cocktails.findById(req.params.cocktailid);

    if (!cocktail) {
        return next(
          new ErrorResponse(`Cocktail not found with id: ${req.params.cocktailid}`, 404)
        );
      }
    const spirit = await Spirits.create(req.body);

    res.status(200).json({
        success: true,
        data: spirit,
    });
});

//@description  Update new spirit
//routes        PUT /api/v1/spirits/:id
//access        private
exports.updateSpirit = asyncHandler(async (req, res, next) => {
  let spirit = await Spirits.findById(req.params.id);

  if (!spirit) {
      return next(
        new ErrorResponse(`Spirit not found with id: ${req.params.id}`, 404)
      );
    }

  spirit = await Spirits.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
      success: true,
      data: spirit,
  });
});

//@description  Delete new spirit
//routes        DELETE /api/v1/spirits/:id
//access        private
exports.deleteSpirit = asyncHandler(async (req, res, next) => {
  const spirit = await Spirits.findById(req.params.id);

  if (!spirit) {
    return next(
      new ErrorResponse(`Spirit not found with id: ${req.params.id}`, 404)
    );
  }

  await spirit.remove();

  res.status(200).json({
      success: true,
      data: {},
  });
});