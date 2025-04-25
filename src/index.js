require('dotenv').config();
require('./config/aws')
const express = require('express'); 
const app = express();
const merchantRoutes=require('./routes/merchantRoutes')
const productRoutes=require('./routes/productRoutes')

app.use(express.json());

app.use('/merchant', merchantRoutes);
app.use('/product', productRoutes);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});