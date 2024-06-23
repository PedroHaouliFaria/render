module.exports = {


  friendlyName: 'Register',


  description: 'Register something.',


  inputs: {

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    // TODO
   // gravar na primeira WebTransportBidirectionalStreamcomo ReadableByteStreamController, vai pegar o id e vai gravar na segunda WebTransportBidirectionalStream

    const user = User.create(inputs.email, inpu)
    user.id
  }


};

