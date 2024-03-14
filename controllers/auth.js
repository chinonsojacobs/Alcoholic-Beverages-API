const ErrorResponse = require("../utilities/errorResponse");
const asyncHandler = require("../middleware/async");
const Users = require("../models/user_model");

//@description  Register users
//routes        POST /api/v1/auth/register
//access        public

exports.register = asyncHandler(async (req, res, next) => {
  const { username, email, password, role } = req.body;

  //Create user
  const user = await Users.create({
    username,
    email,
    password,
    role,
  });

  //Create token
  const token = await user.getSignedJwtToken(); 
  
  res.status(201).json({
    success: true, token
  });
});

//@description  Login users
//routes        POST /api/v1/auth/login
//access        public

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

//Validate email and password
  if (!email ||!password) {
    return next(
      new ErrorResponse("Please provide an email and password", 400)
    );
  }

//Check if user exists  
  const user = await Users.findOne({ email }).select('+password');

  if (!user) {
    return next(
      new ErrorResponse(`User not found with email: ${email}`, 404)
    );
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(
      new ErrorResponse(
        `Invalid password for user with email: ${email}`,
        401
      )
    );
  }

  res.status(200).json({
    success: true,
    token: user.getSignedJwtToken()
  });
});