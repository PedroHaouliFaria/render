module.exports = {
  attributes: { 
    // 'name' attribute is a required string
    name: { 
      type: 'string', 
      required: true 
    },
    // 'users' is a collection of user records associated via the 'country' field in the User model
    users: {
      collection: 'user',
      via: 'country'
    }
  }
};
