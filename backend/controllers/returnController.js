const Return = require("../models/Return");
const asyncHandler = require("../middleware/asyncHandler");

exports.getReturns = asyncHandler(async (req, res) => {
  const returns = await Return.find();
  res.json(returns);
});

exports.createReturn = asyncHandler(async (req, res) => {
  const newReturn = new Return(req.body);
  const savedReturn = await newReturn.save();
  res.status(201).json(savedReturn);
});

exports.deleteReturn = asyncHandler(async (req, res) => {
  await Return.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
});
