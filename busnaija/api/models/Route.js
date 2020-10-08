/**
 * Route.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
      //Define the properties for each route listing
      leavingFrom:{
        type: "string",
        required: true,
        description: "This will be the current location or take of point for the route",
        example: "Lagos"
      },
      goingTo:{
        type: "string",
        required: true,
        description: "This will be the destination or drop of point for the route",
        example: "Enugu"
      },
      pricePerTicket:{
        type: "number",
        required: true,
        description: "Price of tickets per seat",
        example: "10,000"
      },
      //Associate a route created to a particular operater
      operator:{
        model: "Operator"
      }
  },

};

