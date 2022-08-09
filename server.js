require("dotenv").config({path:"./configs/.env"})

const express = require("express");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});