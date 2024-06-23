module.exports = {
  attributes: {
    // 'title' is a required string attribute
    title: { 
      type: 'string', 
      required: true 
    },
    // 'assignmentDate' is a string that represents a timestamp
    assignmentDate: { 
      type: 'string', 
      columnType: 'timestamp' 
    },
    // 'user' is a reference to the 'user' model (foreign key)
    user: {
      model: 'user'
    },
    // 'question' is a reference to the 'question' model (foreign key)
    question: {
      model: 'question', 
      required: true 
    },
    // 'questiontwo' is a reference to the 'questionTwo' model (foreign key)
    questiontwo: {
      model: 'questionTwo', 
      required: true 
    },
    // 'ratedUser' is a required string attribute
    ratedUser: {
      type: 'string',
      required: true
    },
    // 'reviewerUser' is a required string attribute
    reviewerUser: {
      type: 'string',
      required: true
    },
    // 'feedback' is a required string attribute
    feedback: {
      type: 'string',
      required: true
    },
    // 'answer' is a required string attribute
    answer: {
      type: 'string',
      required: true
    }
  }
};
