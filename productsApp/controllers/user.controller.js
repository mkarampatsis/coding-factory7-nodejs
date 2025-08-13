const User = require('../models/user.model');
const userService = require('../services/user.services');
const bcrypt = require('bcrypt');

const logger = require("../logger/logger");
const { error } = require('winston');

exports.findAll = async (req, res) => {
  console.log("Find All system users");

  try {
    const result = await User.find();
    // const result = await userService.findAll();
    res.status(200).json({ status: true, data: result });
    console.log('Success in reading all users');
    // console.info("\x1b[32m",'Info>> Success in reading all users');
    // console.error("\x1b[31m",'Error>> Success in reading all users');
    // console.warn("\x1b[33m",'Warn>> Success in reading all users');
    logger.info("Success in reading all users");
    logger.warn("Success in reading all users");
    logger.error("Success in reading all users");
    logger.log("debug", "Success in reading all users");
    logger.debug("Success in reading all users");
  } catch (err) {
    res.status(400).json({ status: false, data: err });
    console.log(`Problem in reading users: ${err}`)
  }
};

exports.findOne = async (req, res) => {
  
  const username = req.params.username;
  console.log("Find user with username", username);

  try {
    const result = await User.findOne({ username: username });
    // const result = await userService.findOne(username);

    if (result) {
      res.status(200).json({ status: true, data: result });
      console.info(`Success in finding user: ${username}`);
    } else {
      res.status(404).json({ status: true, data: result });
      console.info(`User not found: ${username}`);
    }
  } catch (err) {
    res.status(400).json({ status: false, data: err });
    console.error(`Problem in finding user: ${username}`);
  }
};

exports.create = async (req, res) => {
  
  saltOrRounds = 10;
  // Hash the password
  let hashedPassword = "";
  // if (data.password)
  if (req.body.password)
    hashedPassword = await bcrypt.hash(req.body.password, saltOrRounds)

  const newUser = new User ({
    username: req.body.username,
    password: hashedPassword,
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    // Change for Crud app
    // address: {
    //   area: req.body.area,
    //   road: req.body.road
    // },
    address: req.body.address,
    // Added later when building crud frontend
    phone: req.body.phone
  });

  console.log("insert user with username:", req.body.username);
  console.log("insert user with username:", req.body);
  // console.log("hashedPassword:", hashedPassword);

  try {
    
    const result = await newUser.save();
    res.status(200).json({ status: true, data: result });
    console.info(`Success in saving user: ${req.body.username}`);

  } catch (err) {
    if (err.hasOwnProperty("errmsg")){
      res.status(400).json({ status: false, data: err.errorResponse.errmsg });
    } else {
      res.status(400).json({ status: false, data: err.message });
    }
    console.error(`Problem in saving user: ${req.body.username}`);
  }
};

exports.update = async (req, res) => {

  const username = req.params.username;

  console.log("Update user with username:", username);

  const updatedUser = {
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    address: {
      area: req.body.address.area,
      road: req.body.address.road
    },
  };

  try {
    const result = await  User.findOneAndUpdate({ username: username }, updatedUser, { new: true });
    res.status(200).json({ status: true, data: result });
    console.info(`Success in updating user: ${ username }`);
  } catch (err) {
    res.status(400).json({ status: false, data: err });
    console.error(`Problem in updating user: ${ username }`);
  }
};

exports.delete = async (req, res) => {

  const username = req.params.username;

  console.log("Delete user with username", username);

  try {
    const result = await User.findOneAndDelete({ username: username });
    res.status(200).json({ status: true, data: result });
    console.info(`Success in deleting user: ${username}`);
  } catch (err) {
    res.status(400).json({ status: false, data: err });
    console.error(`Problem in deleting user: ${username}`, err);
  }
};

exports.checkDuplicateEmail = async(req, res) => {
  const email = req.params.email;

  console.log("Check for duplicate email address", email);
  try {
    const result = await User.findOne({ email: email });
    if (result) {
      res.status(400).json({ status: false, data: result });
    } else {
      res.status(200).json({ status: true, data: result });
    }
  } catch (err) {
    res.status(400).json({ status: false, data: err });
    console.error(`Problem in finding email address: ${email}`, err);
  }
}

// exports.findAll = function (req, res) {
//   console.log("Find all users");

//   User.find( (err, results) => {
// 		if (err) {
// 			res.status(400).json({ status: false, data: err });
//      console.log(`Problem in reading users: ${err}`)
// 		} else {
// 			res.status(200).json({ status: true, data: results });
//      console.log('Success in reading all users');

// 		}
// 	});
// };

// exports.findOne = function (req, res) {
  
//   const username = req.params.username;

//   console.log("Find user with username", username);

//   User.findOne({ username: username }, (err, result) => {
// 		if (err) {
// 			res.json({ status: false, data: err });
//       errorLog.info(`Problem in finding user: ${username}`);
// 		} else {
//       res.json({ status: true, data: result });
//       successlog.info(`Success in finding user: ${username}`);
// 		}
// 	});
// };
