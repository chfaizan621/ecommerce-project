const express = require('express');
const productRoutes = require('./routes/productRoutes');
const app = express();
const connectDatabase = require('./config/db'); 


if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "./config/config.env" });
  }
  
connectDatabase();

const bodyParser = require('body-parser');

app.use(bodyParser.json());


app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));