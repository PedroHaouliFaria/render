module.exports = {
  create: async function (req, res) {
    try {
      // Extract 'name' from the request body
      const { name } = req.body;
      
      // Check if 'name' is provided, if not, return a bad request response
      if (!name) {
        return res.badRequest({ error: 'Name is required' });
      }

      // Create a new Universe entry with the provided name and fetch the created entry
      const universe = await Universe.create({ name }).fetch();
      
      // Return the created universe entry as a JSON response
      return res.json(universe);
    } catch (error) {
      // If an error occurs, return a server error response with the error message
      return res.serverError(error);
    }
  }
};
