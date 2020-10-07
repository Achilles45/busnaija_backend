module.exports = {

  friendlyName: 'Signup',

  description: 'This action creates an account for a new operator',

  inputs: {
    firstName: {
      type: "string",
      required: true,
      minLength: 3
    },
    lastName: {
      type: "string",
      required: true,
      minLength: 3
    },
    emailAddress: {
      type: "string",
      required: true,
    },
    phoneNumber:{
      type: "number",
      required: true,
    },
    companyName:{
      type: "string",
      required: true,
    },
    headOffice:{
      type: "string",
      required: true
    },
    password:{
      type: "string",
      required: true,
      minLength: 5
    }
  },

  exits: {
    success:{
      description: "Everything went well and the operator has been signed in"
    },
    emptyFields:{
      description: "Inputs not completely provided"
    },
    emailAlreadyInUse:{
      description: "Email already in use by another user"
    }
  },

  fn: async function (inputs, exits) {
    try {
        //Convert email address to lower case to be on the safer side
        const newEmailAddress = inputs.emailAddress.toLowerCase();
        const newOperator = await Operator.create({
        id: sails.helpers.getUuid(),
        firstName: inputs.firstName,
        lastName: inputs.lastName,
        emailAddress: newEmailAddress,
        phoneNumber: inputs.phoneNumber,
        companyName: inputs.companyName,
        registrationNumber: "",
        tin: "",
        bankName: "",
        accountNumber: "",
        accountName: "",
        headOffice: inputs.headOffice,
        password: inputs.password
        }).fetch()

        //Generate a new jwt token for the user
        const token = await sails.helpers.generateNewJwtToken(newEmailAddress)

        //Set the new user to automatically login to the app
        this.req.me = newOperator;

        //Retun the details of this new user
        return exits.success({
          message: "Your account was successfully created",
          data: newOperator,
          token
      })
    } catch (error) {
      sails.log(error)
      if(error.code == "E_MISSING"){
        return exits.emptyFields({message: "Oops! It seems like you have not provided all the required details"})
      }
      if(error.code == "E_UNIQUE"){
        return exits.emailAlreadyInUse({message: "Oops! This email is already in use by another busnaija operator"})
      }
    }
  }
};
