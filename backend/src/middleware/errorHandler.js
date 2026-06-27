const HttpError = require('./../errors/HttpError.js');

const errorHandlerMiddleware = (error, req, res, next) => {
    if (error instanceof HttpError) {
        return res.status(error.status).json({ message: error.message });
    }

    if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
    }

    return res.status(500).json({ message: "Erro interno do servidor!" });
};

module.exports = errorHandlerMiddleware;