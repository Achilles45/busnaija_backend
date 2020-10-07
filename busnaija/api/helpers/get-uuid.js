const { v4: uuidv4 } = require('uuid');
module.exports = {

  friendlyName: 'Get uuid',

  description: 'The helper to generate random unique IDs for any new record created',

  sync: true,
  
  inputs: {},

  exits: {
    success: {
      outputFriendlyName: 'Uuid',
    },
  },

  fn: function (inputs) {
    // Get uuid.
    const uuid = uuidv4()
    return uuid;
  }
};

