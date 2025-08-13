const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const validateEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

let addressSchema = new Schema({
  area: { type: String },
  road: { type: String }
}, { _id : false });

let phoneSchema = new Schema({
  type: { type: String },
  number: { type: String }
}, { _id : false });

let productSchema = new Schema({
  product: { type: String },
  cost: { type: Number },
  quantity: { type: Number, required: true },
  date: { type: Date,  default: Date.now },
});

let userSchema = new Schema({
  username: {
    type: String, 
    required: [ true, 'Username is required field' ], 
    max: 100, 
    unique:true,
    trim:true,
		lowercase:true, 
  },
  password: {type: String, required: [true, 'Password is required field'], max: 100},
  name: {type: String, required: [ true, 'Name is required field' ], max: 100},
  surname: {type: String, required: [ true, 'Surname is required field' ], max: 100},
  email: {
    type: String, 
    required: [true, 'Email is required field'], 
    max: 100, 
    unique:true,
    trim:true,
		lowercase:true, 
    // validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Email address is not valid",
    ],
  },
  address: addressSchema,
  phone: { type:[phoneSchema], null: true },
  roles:{type:[String], null:true},
  products: { type: [productSchema], null: true  }
},
{ 
  collection: 'users',
  timestamps: true 
});

// Apply the uniqueValidator plugin to userSchema.
// userSchema.plugin(uniqueValidator);

// Export the model
module.exports = mongoose.model('User', userSchema);