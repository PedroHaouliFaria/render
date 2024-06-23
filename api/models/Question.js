module.exports = {
  attributes: {
    // 'form' is a collection of form records associated via the 'question' field in the Form model
    form: {
      collection: 'form',
      via: 'question'
    },
    // 'question1' is a required string attribute
    question1: {
      type: 'string',
      required: true,
    },
    // 'question2' is a required string attribute
    question2: {
      type: 'string',
      required: true,
    },
    // 'question3' is a required string attribute
    question3: {
      type: 'string',
      required: true,
    },
  }
};
