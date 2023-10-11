const ErrorResponse = require("../utilities/errorResponse");
const asyncHandler = require("../middleware/async");
const Cocktails = require("../models/ct_model");

//@description  Get all cocktails
//routes        GET /api/v1/cocktails
//access        public
exports.getCocktails = asyncHandler(async (req, res, next) => {
  let query;

  //Copy request query into reqQuery
  const reqQuery = { ...req.query };

  //Field to exclude
  const excludeFields = ["select", "sort", "page", "limit"];

  //Remove fields from reqQuery
  excludeFields.forEach((field) => delete reqQuery[field]);

  console.log(reqQuery);

  //Create query string from reqQuery object
  let queryString = JSON.stringify(reqQuery);

  //Finding cocktails based on query string
  query = Cocktails.find(JSON.parse(queryString));

  //Select fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  //Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("garnish_name");
  }

  //Page
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 1;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const totalCocktails = await Cocktails.countDocuments();

  query = query.skip(startIndex).limit(limit);

  //Execute query
  const cocktails = await query;

  //Pagination results
  const pagination = {};
  if (endIndex < totalCocktails) {
    pagination.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit: limit,
    };
  }

  res
    .status(200)
    .json({
      success: true,
      count: cocktails.length,
      pagination,
      data: cocktails,
    });
});

//@description  Get a single cocktail
//routes        GET /api/v1/cocktails:id
//access        public
exports.getSingleCocktail = asyncHandler(async (req, res, next) => {
  const cocktail = await Cocktails.findById(req.params.id);

  if (!cocktail) {
    return next(
      new ErrorResponse(`Cocktail not found with id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: cocktail });
});

//@description  Add new cocktail
//routes        POST /api/v1/cocktails
//access        private
exports.addCocktail = asyncHandler(async (req, res, next) => {
  const cocktails = await Cocktails.create(req.body);

  res.status(201).json({
    success: true,
    data: cocktails,
  });
});

//@description  Update cocktail
//routes        PUT /api/v1/cocktails/:id
//access        private
exports.updateCocktail = asyncHandler(async (req, res, next) => {
  const cocktail = await Cocktails.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!cocktail) {
    return next(
      new ErrorResponse(`Cocktail not found with id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: cocktail });
});

//@description  Delete cocktail
//routes        DELETE /api/v1/cocktails/:id
//access        private
exports.deleteCocktails = asyncHandler(async (req, res, next) => {
  const cocktail = await Cocktails.findByIdAndDelete(req.params.id);

  if (!cocktail) {
    return next(
      new ErrorResponse(`Cocktail not found with id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: {} });
});
