/**
 * Operator.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    //Define the properties for an operator
    firstName:{
      type: "string",
      required: true,
      description: "First name of the user creating the account at the moment",
      example: "Achilles"
    },
    lastName:{
      type: "string",
      required: true,
      description: "Last name of the user creating the account",
      example: "Ewomamena"
    },
    emailAddress:{
      type: "string",
      required: true,
      isEmail: true,
      unique: true,
      description: "A valid email address of the operartor",
      example: "achillesusuoyibo7@gmail.com",
    },
    phoneNumber:{
      type: "number",
      required: true,
      description: "Mobile number of the bus operator",
      example: "090898764755"
    },
    companyName:{
      type: "string",
      required: true,
      description: "This is the official name of the company or bus operator",
      example: "God is good motors"
    },
    registrationNumber:{
      type: "string",
      // required: true,
      description: "A unique representation of the company/business registration number from CAC",
      example: "1578o83"
    },
    tin:{
      type: "string",
      description: "Tax Identity Number of the company or bus operator",
      example: "474948430"
    },
    headOffice:{
      type: "string",
      required: true,
      description: "The head office of the bus operator"
    },
    bankName:{
      type: "string",
      description: "Bank name where the bus operator has an active account for the business",
      example: "Access Bank, First Bank, Zenith Bank"
    },
    accountNumber:{
      type: "string",
      description: "The account number of the bus operator/company",
      example: "0788787355"
    },
    accountName:{
      type: "string",
      description: "Account name of the bus operator/company",
      example: "Achilles Usuoyibo"
    },
    password:{
      type: "string",
      required: true,
      description: "A representation of the users securedly hashed password",
      example: "adnf8943dauf99H2AA"
    }
  },

  //Function to omit password when returning the details of the user
  customToJSON: function(){
    return _.omit(this, ["password"])
  },

  //Function to hash the password before creating the operator
  beforeCreate: function(values, proceed){
    sails.helpers.passwords.hashPassword(values.password)
    .exec((err, hashedPassword)=>{
      if(err){
        return proceed(err)
      }
      values.password = hashedPassword;
    })
    proceed()
  }

};

