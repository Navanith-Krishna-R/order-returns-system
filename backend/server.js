const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const returnRoutes = require("./routes/returnRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/returns", returnRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
