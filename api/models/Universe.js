module.exports = {
  attributes: {
    // 'name' is a required string attribute
    name: { 
      type: 'string', 
      required: true 
    },
    // 'groups' is a collection of group records associated via the 'universe' field in the Group model
    groups: {
      collection: 'group',
      via: 'universe'
    }
  }
};
