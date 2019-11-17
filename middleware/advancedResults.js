const advancedResults = (model, populate) => async => {
    let query;

    // Copy the request query
    const reqQuery = { ...req.query };

    // Create query string
    let queryStr = JSON.stringify(reqQuery);

    // Finding resource
    query = model.find(JSON.parse(queryStr));

    next();
}

module.exports = advancedResults;