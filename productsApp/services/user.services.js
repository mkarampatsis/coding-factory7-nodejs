const User = require('../models/user.model');

function findAll() {
  const result = User.find();
  return result;
}

function findOne(username) {
  const result = User.findOne({ username: username })
  return result;
}

async function findLastInsertedUser() {
  console.log("Find Last inserted user");

  try {
    const result = await User.find({}).sort({_id:-1}).limit(1);
      console.log('Success in finding user', result[0].username);
      return result[0];
  } catch (err) {
      console.log(`Problem in finding user: ${err}`)
      return false
  }
};

async function findUsersProduct(username, product) {
  console.log("Find user's product", username, product);

  try {
    const result = await  User.findOne({ username: username, 'products.product':product }, { 'products.$': 1, username: 1 });
    console.log("Success in finding user's product", result.username);
    return result;
  } catch (err) {
      console.log(`Problem in finding user's product: ${err}`)
      return false
  }
};

module.exports = { findAll, findOne, findLastInsertedUser, findUsersProduct };