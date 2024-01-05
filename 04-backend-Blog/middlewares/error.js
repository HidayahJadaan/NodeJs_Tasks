// NOT FOUND MIDDLEWARE
const notFound = (req, res, next)=>{
    const error = new Error(`*** NOT FOUND *** - ${req.originalUrl}`);
    res.status(404);
    next(error);
}

// =============================

//  ERROR HANDLER MIDDLEWARE
const errorHandler = (err, req, res, next)=>{
    const StatusCode = res.statusCode === 200 ? 500 : res.statusCode;

    res.status(StatusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
}

module.exports = {
    notFound,
    errorHandler
}