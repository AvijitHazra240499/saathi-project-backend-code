const { v4: uuidv4 } = require('uuid');
const Merchant = require('../models/Merchant');
const MerchantProducts = require('../models/MerchantProducts');
const dynamoose = require('dynamoose');

exports.createProduct = async (req, res) => {
  try {
    const product = new MerchantProducts({ product_id: uuidv4(), ...req.body });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listProducts = async (req, res) => {
  try {
    const products = await MerchantProducts.scan().exec();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.readProduct = async (req, res) => {
  try {
    const product = await MerchantProducts.get(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updated = await MerchantProducts.update({ product_id: req.params.id }, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await MerchantProducts.delete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
