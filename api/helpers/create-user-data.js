module.exports = {
  friendlyName: 'Create User Data',
  description: 'Helper to create user data in the Logins, Universe, and Groups tables',

  inputs: {
    email: {
      type: 'string',
      required: true // Email is required
    },
    password: {
      type: 'string',
      required: true // Password is required
    },
    universe: {
      type: 'string',
      required: true // Universe name is required
    },
    groups: {
      type: 'string',
      required: true // Group name is required
    }
  },

  exits: {
    success: {
      description: 'Data created successfully.' // Success exit description
    },
    error: {
      description: 'Data creation failed.' // Error exit description
    }
  },

  fn: async function (inputs, exits) {
    try {
      // Create a login entry with the provided email and password
      const login = await Login.create({ email: inputs.email, password: inputs.password }).fetch();
      
      // Create a universe entry with the provided universe name
      const uni = await Universe.create({ name: inputs.universe }).fetch();
      
      // Create a group entry with the provided group name and associated universe ID
      const group = await Group.create({ name: inputs.groups, universe: uni.id }).fetch();

      // Return the created login, universe, and group data in the success exit
      return exits.success({ login, uni, group });
    } catch (error) {
      // Return the error in the error exit if any step fails
      return exits.error(error);
    }
  }
};
