export default (err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
        error: process.env.NODE_ENV === "dev" ? err : {}, // Expose error details in development
    });
};
