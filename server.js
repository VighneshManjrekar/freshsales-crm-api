require("dotenv").config({ path: "./configs/.env" });

const express = require("express");

// Security pkgs
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");

// import router
const crmRoutes = require("./routes/crm.route");

const app = express();
const PORT = process.env.PORT || 7000;

// body-parser middleware
app.use(express.json());

// Security headers
app.use(helmet());
// Prevent XSS
app.use(xss());
// Limit req rate
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 15 minutes
  max: 100, // Each ip maximum 100 requests per 15 minutes
});
app.use(limiter);
// Protect against HTTP Parameter Pollution attacks
app.use(hpp());
// Enable CORS
app.use(cors());

// mount router
app.use(crmRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
