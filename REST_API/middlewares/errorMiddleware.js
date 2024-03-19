exports.errorandler = (err, req, res, next) => {
    // todo: to update with specific errors
    const message = err.message || 'Something went wrong!';
    const status = err.status || 500;

    res.status(status).json({ message });
};
