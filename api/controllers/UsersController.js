const bcrypt = require('bcrypt');

module.exports = {
  renderAboutMe: async function (req, res) {
    try {
      // Check if the user is logged in by verifying if the session has a userId
      if (!req.session.userId) {
        return res.redirect('/'); // Redirect to the home page if not logged in
      }

      const userId = req.session.userId;
      console.log('User ID from session:', userId);

      // Find the user by their ID and populate the associated group and country
      const user = await User.findOne({ id: userId }).populate('group').populate('country');

      if (!user) {
        return res.status(404).json({ error: 'User not found' }); // Return 404 if user is not found
      }

      // Log user and country details for debugging
      console.log('User:', JSON.stringify(user, null, 2));
      console.log('Country:', JSON.stringify(user.country, null, 2));

      // Render the 'aboutme' page with the user details
      return res.view('pages/aboutme', {
        user: user
      });
    } catch (error) {
      console.log('Error:', error);
      return res.serverError(error); // Handle server errors
    }
  },

  aboutMe: async function (req, res) {
    try {
      const userId = req.session.userId;
      console.log('User ID from session:', userId);

      // Find the user by their ID and populate the associated group and country
      const user = await User.findOne({ id: userId }).populate('group').populate('country');

      if (!user) {
        return res.status(404).json({ error: 'User not found' }); // Return 404 if user is not found
      }

      // Log user details for debugging
      console.log('User:', JSON.stringify(user, null, 2));

      // Render the 'aboutme' page with the user details
      return res.view('pages/aboutme', {
        user: user
      });
    } catch (error) {
      console.log('Error:', error);
      return res.serverError(error); // Handle server errors
    }
  },

  updateBio: async function (req, res) {
    // Check if the user is logged in
    if (!req.session.userId) {
      return res.forbidden({ message: 'You are not logged in.' });
    }

    try {
      const { updatedBio } = req.body;
      // Update the user's bio with the new value
      await User.updateOne({ id: req.session.userId }).set({ bio: updatedBio });
      return res.ok({ message: 'Bio updated successfully' });
    } catch (error) {
      return res.serverError({ message: 'An error occurred while updating the bio.' });
    }
  },

  list: async (req, res) => {
    try {
      // Find all users and populate their associated country
      const users = await User.find().populate('country');

      // Return JSON response if requested
      if (req.wantsJSON) {
        return res.json(users);
      }

      // Render the 'teampage' view with the list of users
      return res.view('pages/teampage', { users });
    } catch (error) {
      console.error('Error fetching users:', error);
      return res.serverError(error); // Handle server errors
    }
  },

  teampage: async function (req, res) {
    // Render the 'teampage' view
    return res.view('pages/teampage');
  },

  find: async function (req, res) {
    try {
      // Find all users and populate their associated group
      const users = await User.find().populate('group');
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ error: error.message }); // Handle errors
    }
  },

  beforeCreate: async function (values, proceed) {
    try {
      // Hash the user's password before saving it to the database
      const hashedPassword = await bcrypt.hash(values.password, 10);
      values.password = hashedPassword;
      return proceed();
    } catch (err) {
      return proceed(err); // Handle errors during hashing
    }
  },

  create: async function (req, res) {
    try {
      const { name, email, password, group, country } = req.body;
      // Check if all required fields are provided
      if (!name || !email || !password || !group || !country) {
        return res.badRequest({ error: 'Name, email, password, group, and country are required' });
      }

      // Create a new user with the provided details
      const user = await User.create({ name, email, password, group, country }).fetch();
      return res.status(201).json(user); // Return the created user
    } catch (error) {
      return res.status(500).json({ error: error.message }); // Handle errors
    }
  },

  login: async function(req, res) {
    const { email, password } = req.body;

    try {
      // Find the user by email
      const user = await User.findOne({ email });
      // Check if user exists and if the password is correct
      if (!user || !await sails.helpers.passwords.checkPassword(password, user.password)) {
        return res.status(401).send({ error: 'Login failed' }); // Return 401 if login fails
      }

      // Set the user ID in the session
      req.session.userId = user.id;

      return res.ok({ message: 'Logged in successfully' });
    } catch (err) {
      return res.serverError(err); // Handle errors
    }
  },

  delete: async function (req, res) {
    try {
      // Check if name and group are provided
      if (!req.body.name || !req.body.group) {
        return res.badRequest({ error: 'Name and group are required' });
      }

      // Delete the user with the specified name and group
      const deletedUsers = await User.destroy({
        name: req.body.name,
        group: req.body.group
      }).fetch();

      // Check if any users were deleted
      if (deletedUsers.length === 0) {
        return res.notFound({ error: 'User not found in the specified group' });
      }

      return res.ok(deletedUsers); // Return the deleted users
    } catch (err) {
      return res.serverError(err); // Handle errors
    }
  },

  returnDetails: async function(req, res) {
    try {
      const userId = req.session.userId; // Get the user ID from the session
      console.log('User ID from session:', userId);

      // Ensure that the userId is defined
      if (!userId) {
        return res.badRequest({ error: 'User ID is required' });
      }

      // Find the user by ID and populate the group and country associations
      const user = await User.findOne({ where: { id: userId } }).populate('group').populate('country');

      if (!user) {
        return res.status(404).json({ error: 'User not found' }); // Return 404 if user is not found
      }

      return res.ok(user); // Return the user details
    } catch (error) {
      return res.serverError(error); // Handle server errors
    }
  },   
};
