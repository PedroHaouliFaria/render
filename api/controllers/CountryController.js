module.exports = {
  find: async function (req, res) {
    try {
      // Fetch all countries from the database
      const countries = await Country.find();
      // Return the list of countries as a JSON response
      return res.json(countries);
    } catch (err) {
      // If there is an error, return a server error response
      return res.serverError(err);
    }
  }
};
