const bcrypt = require('bcrypt');

module.exports = {
  attributes: {
    // 'email' is a required and unique string attribute
    email: { 
      type: 'string', 
      required: true, 
      unique: true 
    },
    // 'password' is a required string attribute
    password: { 
      type: 'string', 
      required: true 
    },
    // 'name' is an optional string attribute
    name: { 
      type: 'string' 
    },
    // 'country' is a reference to the 'country' model (foreign key) and is required
    country: { 
      model: 'country',
      required: true
    },
    // 'bio' is an optional string attribute
    bio: { 
      type: 'string' 
    },
    // 'group' is a reference to the 'group' model (foreign key) and is required
    group: {
      model: 'group',
      required: true
    },
    // 'forms' is a collection of form records associated via the 'user' field in the Form model
    forms: {
      collection: 'form',
      via: 'user'
    },
    // 'dmstyle' is an optional string attribute
    dmstyle: { 
      type: 'string' 
    },
    // 'createdAt' is a number attribute that is automatically set when the record is created
    createdAt: { 
      type: 'number', 
      autoCreatedAt: true 
    },
    // 'updatedAt' is a number attribute that is automatically updated when the record is updated
    updatedAt: { 
      type: 'number', 
      autoUpdatedAt: true 
    }
  },
  // Before creating a user, hash the password
  beforeCreate: async function (values, proceed) {
    try {
      // Hash the password with a salt round of 10
      const hashedPassword = await bcrypt.hash(values.password, 10);
      values.password = hashedPassword; // Replace the plain password with the hashed password
      return proceed(); // Proceed with the creation
    } catch (err) {
      return proceed(err); // Handle any errors that occur during hashing
    }
  }
};
