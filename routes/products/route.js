const express = require('express');
const products = require('./constants');

const productsRouter = express.Router();

productsRouter.get('/', (req, res) => {
    // const result = await fetchGet(URLS.ALL_PRODUCTS);
    res.json(Array.from(products.values()));
});

productsRouter.get('/:id', (req, res) => {
    // const result = await fetchGet(URLS.ALL_PRODUCTS);
    res.json(products.get(req.params.id));
});

module.exports = productsRouter;
