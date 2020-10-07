module.exports = {

  friendlyName: 'Generate new jwt token',

  description: 'This helper generates a new jwt token',

  inputs: {
    subject:{
      type: "string",
      required: true
    }
  },

  exits: {
    success: {
      description: 'All done.',
    },

  },

  fn: async function (inputs) {
    const payload = {
      sub: inputs.subject,
      iss: "Busnaija Backend"
    };
    const token = await sails.helpers.issueJwt(payload)
    return token;
  }
};

