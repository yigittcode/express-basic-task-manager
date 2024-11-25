// errorHandler.js
class CustomError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}

const errorHandler = (err, req, res, next) => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({
            message: err.message,
        });
    }

    if (err.message && err.message.includes("not found")) {
        return res.status(404).json({
            message: 'Resource not found', // 404 hatası
        });
    }

    res.status(500).json({
        message: 'Something went wrong! Please try again later.',
        error: err.message || err,
    });
};

export { CustomError, errorHandler };
