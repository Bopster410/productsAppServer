import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { URLS } from './urls';
import {
    addNewUser,
    addProductToCart,
    getUserByEmail,
    getUserCart,
} from '../../db/users';
import { generateAccessToken } from '../../helpers/auth';
import {
    addRefreshToken,
    refreshTokenExists,
    removeRefreshToken,
} from '../../db/auth';
import { Profile } from '../../db/users/types';

const authRouter = express.Router();

authRouter.post(URLS.LOGIN_USER, async (req, res) => {
    let { user, profile } = getUserByEmail(req.body.email);
    let newUser = false;
    if (user === undefined || profile === undefined) {
        const createdUserProfile = await addNewUser(
            req.body.email,
            req.body.password
        );
        user = createdUserProfile.user;
        profile = createdUserProfile.profile;
        newUser = true;
    }

    try {
        const wasLogged = newUser
            ? true
            : await bcrypt.compare(req.body.password, user.password);

        if (wasLogged) {
            const accessToken = generateAccessToken(profile);
            const refreshToken = jwt.sign(
                user,
                process.env.REFRESH_TOKEN_SECRET
            );
            addRefreshToken(refreshToken);

            res.status(200).json({
                accessToken: accessToken,
                refreshToken: refreshToken,
                cart: getUserCart(user.userId),
            });
        }
        if (!wasLogged) res.status(400).send();
    } catch {
        res.status(500).send();
    }
});

authRouter.post(URLS.REFRESH_TOKEN, (req, res) => {
    const refreshToken = req.body.token;
    if (refreshToken === null) return res.sendStatus(401);
    if (!refreshTokenExists(refreshToken)) return res.sendStatus(403);
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (error: jwt.VerifyErrors, profile: Profile) => {
            if (error) return res.sendStatus(401);
            const accessToken = generateAccessToken({
                userId: profile.userId,
                email: profile.email,
            });
            res.json({ accessToken });
        }
    );
});

authRouter.post(URLS.LOGOUT_USER, (req, res) => {
    removeRefreshToken(req.body.token);
    res.sendStatus(204);
});

export { authRouter };
