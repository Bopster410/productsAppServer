import express from 'express';
import { URLS } from './urls';
import { WithUserRequest } from './types';
import { authenticateToken } from '../../middleware/auth';
import {
    addNewUser,
    addProductToCart,
    getAllUsers,
    getUserCart,
    removeProductFromCart,
} from '../../db/users';
import { Product } from '../../db/products/types';
import { getProductById } from '../../db/products';

const usersRouter = express.Router();

usersRouter.get(URLS.ALL_USERS, (_, res) => {
    res.json(getAllUsers());
});

usersRouter.post(URLS.ADD_USER, async (req, res) => {
    try {
        addNewUser(req.body.email, req.body.password);
        res.sendStatus(201);
    } catch {
        res.status(500).send();
    }
});

usersRouter.get(
    URLS.USER_CART,
    authenticateToken,
    (req: WithUserRequest, res) => {
        const cart = getUserCart(req.user.userId);
        const productsInCart = [] as { total: number; product: Product }[];
        cart.forEach(({ productId, total }) => {
            const product = getProductById(productId);
            if (product) productsInCart.push({ total, product });
        });
        res.json(productsInCart);
    }
);

usersRouter.post(
    URLS.ADD_TO_CART,
    authenticateToken,
    async (req: WithUserRequest, res) => {
        try {
            const total = addProductToCart(req.user.userId, req.body.productId);
            res.status(200).json({ total });
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }
);

usersRouter.post(
    URLS.REMOVE_FROM_CART,
    authenticateToken,
    async (req: WithUserRequest, res) => {
        try {
            const total = removeProductFromCart(
                req.user.userId,
                req.body.productId
            );
            res.status(200).json({ total });
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }
);

export { usersRouter };
