var jwt = require('jsonwebtoken');
module.exports = {

  friendlyName: 'Issue jwt',

  description: '',

  inputs: {
    payload:{
      type: "ref",
      required: true
    }
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs) {
    const key = sails.config.custom.key;
    const token = jwt.sign(inputs.payload, key);
    return token;
  }
};

