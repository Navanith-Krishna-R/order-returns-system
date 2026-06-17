const mongoose = require("mongoose");

const ReturnSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  submittedAt: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Return", ReturnSchema);