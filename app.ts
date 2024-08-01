import { API_ROUTE, ROUTERS_URLS } from './constants';
import { productsRouter } from './routes/products';
import { usersRouter } from './routes/users';
import express from 'express';
import cors from 'cors';
import { authRouter } from './routes/auth';
require('dotenv').config();

const MODE = process.env.NODE_ENV;

const app = express();

app.use(express.json());

app.use(
    cors({
        origin:
            MODE === 'production'
                ? 'https://prismatic-cat-80aedd.netlify.app'
                : 'http://localhost:5173',
        credentials: true,
        optionsSuccessStatus: 200,
    })
);

app.use(API_ROUTE + ROUTERS_URLS.PRODUCTS, productsRouter);
app.use(API_ROUTE + ROUTERS_URLS.USERS, usersRouter);
app.use(API_ROUTE + ROUTERS_URLS.AUTH, authRouter);

app.listen(3030);
console.log('Server is running...');
