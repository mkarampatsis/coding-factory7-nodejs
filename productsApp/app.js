const express = require('express');
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');

const auth = require("./routes/auth.route");
const user = require("./routes/user.route");
const product = require("./routes/product.route");
const userProduct = require("./routes/user.product.route");

// Αρχικά χωρίς cors
const cors = require('cors');

app.use(cors({
    origin: '*'
    // origin: ['https://www.section.io', 'https://www.google.com/']
}));

app.use('/', express.static('files'));

app.use('/api/auth', auth);
app.use('/api/users', user);
app.use('/api/products', product);
app.use('/api/user-product', userProduct);

app.use(
  '/api-docs',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument.options)
);

module.exports = app;