const paginatedResults = (model) => {
    return async (req, res, next) => {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
  
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
  
      const results = {};
  
      try {
        results.total = await model.countDocuments().exec();
        results.results = await model.find().limit(limit).skip(startIndex).exec();
  
        if (endIndex < results.total) {
          results.next = {
            page: page + 1,
            limit: limit
          };
        }
  
        if (startIndex > 0) {
          results.previous = {
            page: page - 1,
            limit: limit
          };
        }
  
        res.paginatedResults = results;
        next();
      } catch (error) {
        next(error);
      }
    };
  };
  
  module.exports = paginatedResults;