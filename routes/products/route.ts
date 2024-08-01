import express from 'express';
import { getProductById, getProducts } from '../../db/products';
import { URLS } from './urls';

const productsRouter = express.Router();

productsRouter.get(URLS.ALL_PRODUCTS, (req, res) => {
    // const result = await fetchGet(URLS.ALL_PRODUCTS);
    res.json(getProducts());
});

productsRouter.get(URLS.PRODUCT_BY_ID, (req, res) => {
    // const result = await fetchGet(URLS.ALL_PRODUCTS);
    res.json(getProductById(req.params.id));
});

export { productsRouter };
