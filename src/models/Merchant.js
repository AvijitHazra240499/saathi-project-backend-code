const dynamoose = require("dynamoose");

const merchantSchema = new dynamoose.Schema({
  merchant_id: {
    type: String,
    hashKey: true, // Primary Key
    required: true
  },
  merchantName: {
    type: String,
    required: true
  },
  merchantLogoUrl: String,
  merchantUrl: String,
  merchantDescription: String,
  bestMerchantOfferAmount: String,
  bestMerchantOfferAmountType: {
    type: String,
    enum: ["amount", "percent"]
  },
  merchantStatus: {
    type: String,
    enum: ["active", "inactive"],
    default: "active"
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

// Create the model
const Merchant = dynamoose.model("Merchants", merchantSchema);

module.exports = Merchant;
