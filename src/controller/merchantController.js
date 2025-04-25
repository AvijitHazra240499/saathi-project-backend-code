const { v4: uuidv4 } = require('uuid');
const Merchant = require('../models/Merchant');
const MerchantProducts = require('../models/MerchantProducts');


exports.createMerchant = async (req, res) => {
  try {

    const merchant = new Merchant({ merchant_id: uuidv4(), ...req.body });
    await merchant.save();
    res.status(201).json(merchant);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listMerchants = async (req, res) => {
  try {
    const merchants = await Merchant.scan().exec();
    const products = await MerchantProducts.scan().exec();

    const enrichedMerchants = merchants.map(merchant => {
      const linkedProducts = products.filter(p => p.merchant_id === merchant.merchant_id);
      return { ...merchant, products: linkedProducts };
    });

    res.json(enrichedMerchants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.readMerchant = async (req, res) => {
  try {
    const merchant = await Merchant.get(req.params.id);
    if (!merchant) return res.status(404).json({ error: 'Merchant not found' });

    const products = await MerchantProducts.scan('merchant_id').eq(merchant.merchant_id).exec();
    res.json({ ...merchant.toJSON(), products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateMerchant = async (req, res) => {
  try {
    const updated = await Merchant.update({ merchant_id: req.params.id }, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteMerchant = async (req, res) => {
  try {
    await Merchant.delete(req.params.id);
    res.json({ message: 'Merchant deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};