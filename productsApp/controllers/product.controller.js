const Product = require('../models/product.model');

exports.findAll = async (req, res) => {
  console.log("Find all products");

  try {
    const result = await Product.find();
    res.status(200).json({ status: true, data: result });
    console.log('Success in reading all products');
  } catch (err) {
    res.status(400).json({ status: false, data: err });
    console.log(`Problem in reading products: ${err}`)
  }
};


exports.findOne = async (req, res) => {
  
  const id = req.params.id;
  console.log("Find product with id", id);

  try {
    const result = await Product.findOne({ _id: id });
    res.status(200).json({ status: true, data: result });
    console.info(`Success in finding product: ${id}`);
  } catch (err) {
    res.status(400).json({ status: false, data: err });
    console.error(`Problem in finding product: ${id}`);
  }
};


exports.create = async (req, res) => {

  const newProduct = new Product ({
    product: req.body.product,
    cost: req.body.cost,
    description: req.body.description,
    quantity: req.body.quantity 
  });

  console.log("insert product with name:", req.body.product);

  try {
    const result = await newProduct.save();
    res.status(200).json({ status: true, data: result });
    console.info(`Success in saving product: ${req.body.product}`);
  } catch (err) {
    res.status(400).json({ status: false, data: err });
    console.error(`Problem in saving product: ${req.body.product}`);
  }
};


exports.update = async (req, res) => {

  const id = req.params.id;

  console.log("Update product with id:", id);

  const updatedProduct = {
    product: req.body.product,
    cost: req.body.cost,
    description: req.body.description,
    quantity: req.body.quantity 
  };

  try {
    const result = await  Product.findOneAndUpdate({ _id: id }, updatedProduct, { new: true });
    res.status(200).json({ status: true, data: result });
    console.info(`Success in updating product: ${ req.body.product }`);
  } catch (err) {
    res.status(400).json({ status: false, data: err });
    console.error(`Problem in updating product: ${ req.body.product }`);
  }
};


exports.delete = async (req, res) => {

  const id = req.params.id;

  console.log("Delete product with id", id);

  try {
    const result = await  Product.findOneAndRemove({ _id: id });
    res.status(200).json({ status: true, data: result });
    console.info(`Success in deleting product: ${id}`);
  } catch (err) {
    res.status(400).json({ status: false, data: err });
    console.error(`Problem in deleting product: ${id}`);
  }
};