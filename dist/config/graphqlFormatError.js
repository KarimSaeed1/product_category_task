export default (err) => {
    // Log the error
    console.error(err);
    // Return error object
    return {
        status: "error",
        message: err.message,
    };
};
