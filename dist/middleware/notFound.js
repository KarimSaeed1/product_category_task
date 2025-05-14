export default (req, res, next) => {
    res.status(404).send({
        error: "Not Found",
        message: "The requested resource could not be found on this server.",
    });
};
