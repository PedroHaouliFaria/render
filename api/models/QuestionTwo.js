// api/models/QuestionTwo.js
module.exports = {
  attributes: {
    // 'form' is a collection of form records associated via the 'questiontwo' field in the Form model
    form: {
      collection: 'form',
      via: 'questiontwo'
    },
    // 'question4' is a required string attribute
    question4: {
      type: 'string',
      required: true,
    },
    // 'question5' is a required string attribute
    question5: {
      type: 'string',
      required: true,
    },
    // 'question6' is a required string attribute
    question6: {
      type: 'string',
      required: true,
    },
    // 'question7' is a required string attribute
    question7: {
      type: 'string',
      required: true,
    },
  }
};
