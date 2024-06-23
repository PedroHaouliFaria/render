const bcrypt = require('bcrypt');

module.exports = {
  login: async function (req, res) {
    try {
      const { email, password } = req.body; // Extract email and password from the request body
      if (!email || !password) {
        console.log('Email and password are required');
        return res.badRequest({ error: 'Email and password are required' }); // Check if email and password are provided
      }

      console.log(`Attempting to find user with email: ${email}`);
      // Modification: added populate to include country information
      const user = await User.findOne({ email }).populate('country'); // Find user by email and include country details
      if (!user) {
        console.log(`User not found for email: ${email}`);
        return res.json({ success: false, message: 'Invalid email or password' }); // If user not found, return an error message
      }

      console.log(`User found: ${JSON.stringify(user)}`);
      const isMatch = await bcrypt.compare(password, user.password); // Compare the provided password with the stored hashed password
      if (!isMatch) {
        console.log(`Password does not match for user: ${email}`);
        return res.json({ success: false, message: 'Invalid email or password' }); // If password does not match, return an error message
      }

      // Save user information in the session, including the country name
      req.session.userId = user.id;
      req.session.userName = user.name;
      req.session.userEmail = user.email;
      req.session.userBio = user.bio;
      req.session.userCountry = user.country ? user.country.name : 'Not specified';  // Use the country name if available

      console.log(`Login successful for user: ${email}`);
      // Return success and user data, excluding the password
      return res.json({ 
        success: true, 
        message: 'Login successful',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          country: user.country ? user.country.name : 'Not specified',
          bio: user.bio,
          // Add other necessary fields, excluding the password
        }
      });
    } catch (error) {
      console.error('Server error:', error);
      return res.serverError(error); // Handle server errors
    }
  }
};
