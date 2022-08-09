require("dotenv").config({path:"./configs/.env"})

const express = require("express");
// import router
const crmRoutes = require("./routes/crm.route");

const app = express();
const PORT = process.env.PORT || 7000;

// body-parser middleware
app.use(express.json());
// mount router
app.use(crmRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});