const express = require("express");
const router = express.Router();
const {
  getReturns,
  createReturn,
  deleteReturn,
} = require("../controllers/returnController");

router.get("/", getReturns);
router.post("/", createReturn);
router.delete("/:id", deleteReturn);

module.exports = router;
