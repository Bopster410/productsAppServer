const { API_ROUTE, ROUTERS_URLS } = require('./constants');
const productsRouter = require('./routes/products/route');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();

app.use(express.json());

app.use(
    cors({
        origin: 'https://prismatic-cat-80aedd.netlify.app',
        credentials: true,
        optionsSuccessStatus: 200,
    })
);

app.use(API_ROUTE + ROUTERS_URLS.PRODUCTS, productsRouter);

app.listen(3030);
console.log('Server is running...');
