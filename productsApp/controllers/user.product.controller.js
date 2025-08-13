const User = require('../models/user.model');

exports.findAll = async (req, res) => {
  console.log("Find all user's products");

  try {
    const result = await User.find({},{username: 1, products: 1});
    res.status(200).json({ status: true, data: result });
    console.log("Success in reading all user's products");
  } catch (err) {
    res.status(400).json({ status: false, data: err });
    console.log(`Problem in reading user's products: ${err}`)
  }
};

exports.findOne = async (req, res) => {
  
  const username = req.params.username;
  console.log("Find user with username", username);

  try {
    const result = await User.findOne({ username: username }, {username: 1, products: 1});
    res.status(200).json({ status: true, data: result });
    console.info(`Success in finding user's products: ${username}`);
  } catch (err) {
    res.status(400).json({ status: false, data: err });
    console.error(`Problem in finding user's products: ${username}`);
  }
};

exports.create = async (req, res) => {

  const username = req.body.username;
  const products = req.body.products;
  console.log(products);

  console.log("insert products to username:", username);

  try {
    const result = await User.updateOne(
      { username: username },
      {
        $push: {
          products: products,
        }
      }
    );
    res.status(200).json({ status: true, data: result });
    console.info(`Success in saving products: ${req.body.username}`);
  } catch (err) {
    res.status(400).json({ status: false, data: err });
    console.error(`Problem in saving products: ${req.body.username}`);
  }
};

exports.update = async (req, res) => {

  const username = req.body.username;
  const product_id = req.body.product._id;
  const product_quantity = req.body.product.quantity;

  console.log("Update product for username:", username);

  try {
    const result = await  User.updateOne(
      { username: username, "products._id": product_id  }, 
      {
        $set: {
          "products.$.quantity": product_quantity
        }
      }
    );
    res.status(200).json({ status: true, data: result });
    console.info(`Success in updating product: ${ username }`);
  } catch (err) {
    res.status(400).json({ status: false, data: err });
    console.error(`Problem in updating product: ${ username }`);
  }
};


exports.delete = async (req, res) => {

  const username = req.params.username;
  const product_id = req.params.id;

  console.log("Delete product for username", username);

  try {
    const result = await  User.updateOne(
      { username: username }, 
      {
        $pull: {
          products: { _id: product_id } }
      }
    );
    res.status(200).json({ status: true, data: result });
    console.info(`Success in deleting user: ${username}`);
  } catch (err) {
    res.status(400).json({ status: false, data: err });
    console.error(`Problem in deleting user: ${username}`);
  }
};

exports.stats1 = async (req, res) => {

  console.log("For all users sum by product and count");

  try {
    const result = await User.aggregate([
      {
        $unwind: "$products" 
      },
      {
        $project: {
          id: 1,
          username:1,
          products:1
        }
      },
      {
          $group: {
          _id: { 
            username: "$username", 
            product: "$products.product" },
          totalAmount: { 
            $sum: { 
              $multiply: [ "$products.cost", "$products.quantity" ] 
            } 
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort:{ "_id.username" : 1, "_id.product" : 1 }
      },
    ]);
    res.status(200).json({ status: true, data: result });
    console.info('Success in stats1');
  } catch (err) {
    res.status(400).json({ status: false, data: err });
    console.error('Problem in stats1');
  }
};

exports.stats2= async (req, res) => {

  const username = req.params.username;
 
  console.log("For user sum by product and count", username);

  try {
    const result = await User.aggregate([
      {
        $match:  { 
          username: username  
        } 
      },
      {
        $unwind: "$products" 
      },
      {
        $project: {
          id: 1,
          username:1,
          products:1
        }
      },
      {
          $group: {
          _id: { 
            username: "$username", 
            product: "$products.product" },
          totalAmount: { 
            $sum: { 
              $multiply: [ "$products.cost", "$products.quantity" ] 
            } 
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort:{ "_id.username" : 1, "_id.product" : 1 }
      }
    ]);
    res.status(200).json({ status: true, data: result });
    console.info('Success in stats2');
  } catch (err) {
    res.status(400).json({ status: false, data: err });
    console.error('Problem in stats2');
  }
};

// exports.findUsersProducts = async(req, res) => {
//     console.log("Find all users products");

//     try {
//         const result = await User.find({}, {username:1, products:1, _id:0});
//         res.json({status: true, data: result}); 
//     } catch (err) {
//         res.json({status:false, data: err});
//     }
// }

// exports.findUserProducts = async(req, res) => {
//     const username = req.params.username;
//     console.log("Find products for user", username);

//     try {
//         const result = await User.findOne({username: username}, {username:1, products:1, _id:0})
//         res.json({status: true, data: result});
//     } catch (err) {
//         res.json({status: false, data: err});
//     }
// }

// exports.insertUserProduct = async(req, res) => {
//     const username = req.params.username;
//     const products = req.body.products;

//     console.log("Insert products to user", username);

//     try {
//         const result = await User.updateOne(
//             { username: username },
//             {
//                 $push: {
//                     products: products
//                 }
//             }
//         )
//         res.json({status: true, data: result})
//     } catch (err) {
//         res.json({status: false, data: err});
//     }
// }

// exports.updateUserProduct = async (req, res) => {
//     const username = req.params.username;
//     const product_id = req.params.id;
//     const product_quantity = req.body.product.quantity;

//     console.log("Update product quantity for user", username);

//     try {
//         const result = await User.updateOne(
//             { username: username, "products._id": product_id },
//             { 
//                 $set: {
//                     "products.$.quantity": product_quantity
//                 }
//             }
//         )

//         res.json({status: true, data: result})
//     } catch (err) {
//         res.json({status: false, data: err});
//     }
// }

// exports.deleteUserProduct = async(req, res) => {
//     const username = req.params.username;
//     const product_id = req.params.id

//     console.log("Delete product from user", username);

//     try {
//         const result = await User.updateOne(
//             { username: username },
//             {
//                 $pull: {
//                     products: { _id: product_id }
//                 }
//             }
//         )
//         res.json({status: true, data: result})
//     } catch (err) {
//         res.json({ status: true, data: err })
//     }
// }