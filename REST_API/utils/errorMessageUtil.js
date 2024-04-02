const mongoose = require('mongoose');

exports.errorMessenger = (err) => {
    let message = '';

    if (err instanceof mongoose.Error.ValidationError) {

        const currentError = Object.values(err.errors)[0];
        if (currentError && currentError.message) {
            message = currentError.message;
        } else {
            message = 'Validation error'
        }
    } else if (err instanceof mongoose.Error.CastError) {
        message = 'Cast error: Invalid ObjectId';
    } else if (err instanceof mongoose.MongooseError) {
        const currentError = Object.values(err.errors)[0];
        if (currentError && currentError.message) {
            message = currentError.message;
        } else {
            message = 'Validation error'
        }

    } else if (err instanceof Error) {

        message = err.message;

    } else if (err instanceof TypeError) {

        message = err.message;

    } else {
        message = 'Unknown error occurred';
    };

    return message;
}