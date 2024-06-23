module.exports = {
  renderQuestions: async function (req, res) {
    try {
      const userId = req.session.userId; // Get the user ID from the session
      const user = await User.findOne({ id: userId }).populate('group'); // Find the user and populate their group

      if (!user) {
        return res.status(404).json({ error: 'User not found' }); // Return 404 if user is not found
      }

      // Render the questions page with the user data
      return res.view('pages/questions', {
        user: user
      });
    } catch (error) {
      return res.serverError(error); // Handle server errors
    }
  },

  // Method for submitting evaluation
  submitEvaluation: async function (req, res) {
    try {
      const respostas = req.body.respostas; // Get the responses from the request body

      // Process the responses using the treatQuestion helper
      const resultadoTratamento = await sails.helpers.treatQuestion(respostas);

      const userId = req.session.userId; // Get the user ID from the session
      const user = await User.findOne({ id: userId }); // Find the user by ID

      if (!user) {
        return res.status(404).json({ error: 'User not found' }); // Return 404 if user is not found
      }

      // Update the user's DM style with the final result
      await User.updateOne({ id: userId }).set({ dmstyle: resultadoTratamento.finalResult });

      // Return a success message and the processed result
      return res.json({ message: 'Evaluation submitted successfully', resultadoTratamento });
    } catch (error) {
      return res.status(500).json({ error: 'An error occurred' }); // Handle errors
    }
  }
};
