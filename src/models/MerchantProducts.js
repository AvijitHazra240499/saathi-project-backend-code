const dynamoose = require("dynamoose");

const merchantProductSchema = new dynamoose.Schema({
  product_id: {
    type: String,
    hashKey: true,
    required: true
  },
  merchant_id: {
    type: String,
    required: true,
    index: {
      name: "MerchantIdIndex",
      global: true
    }
  },
  merchantProductName: {
    type: String,
    required: true
  },
  merchantProductDescription: String,
  merchantProductPrice: Number,
  merchantProductOfferAmount: Number, // Store as string to allow both "1000" and "10%"
  merchantProductOfferType: {
    type: String,
    enum: ["amount", "percent"]
  },
  merchantProductImageUrl: String,
  merchantProductUrl: String,
  merchantProductStatus: {
    type: String,
    enum: ["active", "inactive"],
    default: "active"
  },
  merchantProductTag: {
    type: Array,
    schema: [String] // Array of tags
  },
  merchantProductParameters: {
    type: Object,
    saveUnknown: true
  }
}, {
  timestamps: true
});

// Create the model
const MerchantProduct = dynamoose.model("MerchantProducts", merchantProductSchema);

module.exports = MerchantProduct;
