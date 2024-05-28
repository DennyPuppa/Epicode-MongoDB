const errorHandler = (err, req, res, next) => {
    const e = err.toString();
    console.log("Sono il middleware errorHandler!! " + "Err: " + e);
    res.status(500).send("Sono il middleware errorHandler!! " + "Err: " + e);
}

module.exports = {errorHandler};