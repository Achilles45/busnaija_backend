module.exports = {

  friendlyName: 'Signin',

  description: 'Signin an operator into his account.',

  inputs: {
    emailAddress:{
      type: "string",
      required: true
    },
    password:{
      type: "string",
      required: true
    }
  },

  exits: {
    success:{
      description: "Successfully signed in"
    },
    credentialsDidNotMatch:{
      description: "User credentials did not match"
    },
    badRequest:{
      description: "Something went wrong"
    },
    emailDoNotExist:{
      description: "User with the email does not exist"
    }
  },


  fn: async function (inputs, exits) {
    try {
      //Check if a user with the email provided exists in our application
    const user = await Operator.findOne({emailAddress: inputs.emailAddress})
    if(!user){
      return exits.emailDoNotExist({
        message: "00ps! No  busnaija operator with this email was found. Create an account if you have not created one"
      })
    }else{
      //Check if the password match
      await sails.helpers.passwords.checkPassword(inputs.password, user.password)
      .intercept("incorrect", ()=>{
        return exits.credentialsDidNotMatch({message: "00ps! Your credentials did not match"})
      })

      //Generate jwt token for the user and set the user
      const token = await sails.helpers.generateNewJwtToken(user.emailAddress)

      this.req.me = user

      //Everything goes well
      return exits.success({
        message: "You have successfully signed in",
        data: user,
        token
      })
    }
    } catch (error) {
      sails.log.error(error)
    }
  }
};
