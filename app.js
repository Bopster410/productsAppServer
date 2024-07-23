const { API_ROUTE, ROUTERS_URLS } = require('./constants');
const productsRouter = require('./routes/products/route');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
        optionsSuccessStatus: 200,
    })
);

app.use(API_ROUTE + ROUTERS_URLS.PRODUCTS, productsRouter);

app.listen(3030);
console.log('Server is running...');
