// api/models/Group.js
module.exports = {
  attributes: {
    // 'name' is a required string attribute
    name: { 
      type: 'string', 
      required: true 
    },
    // 'universe' is a reference to the 'universe' model (foreign key)
    universe: {
      model: 'universe', 
      required: true 
    },
    // 'users' is a collection of user records associated via the 'group' field in the User model
    users: {
      collection: 'user',
      via: 'group'
    }
  }
};
