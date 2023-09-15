const errorResponse = require('../utilities/errorResponse');

const errorHandler = (err, req, res, next) => {

    let error = { ...err };

    error.message = err.message;

    // Log to console
    console.log(err);

    // Mongoose error ObjectID
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        const message = `Resource not found with id of ${err.value}`;
        error = new errorResponse(message, 404);
    }

    // Mongoose duplicate key error
    if (err.code === 11000) {
        const message = `Resource already exists with name`;
        error = new errorResponse(message, 409);
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map((val) => val.message);
        error = new errorResponse(message, 400);
    }

    // Send error to client
    res.status(error.statusCode || 500).json({ success: false, error: error.message });
}

module.exports = errorHandler;