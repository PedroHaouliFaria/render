module.exports = {
  create: async function (req, res) {
    try {
      const { name, universeName } = req.body;
      // Check if name and universeName are provided in the request body
      if (!name || !universeName) {
        return res.badRequest({ error: 'Name and universeName are required' });
      }

      // Find the universe by its name
      const universe = await Universe.findOne({ name: universeName });
      if (!universe) {
        return res.badRequest({ error: 'Universe not found' });
      }

      // Create a new group with the provided name and universe ID
      const group = await Group.create({ name, universe: universe.id }).fetch();
      // Return the created group as a JSON response
      return res.json(group);
    } catch (error) {
      // If there is an error, return a server error response
      return res.serverError(error);
    }
  },
  find: async function (req, res) {
    try {
      // Fetch all groups from the database
      const groups = await Group.find();
      // Return the list of groups as a JSON response
      return res.json(groups);
    } catch (error) {
      // If there is an error, return a server error response
      return res.serverError(error);
    }
  }
};
