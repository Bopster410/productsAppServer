import { NextFunction, Response } from 'express';
import { WithUserRequest } from '../../routes/users/types';
import jwt from 'jsonwebtoken';
import { Profile } from '../../db/users/types';

export function authenticateToken(
    req: WithUserRequest,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token === null) return res.status(401).send();

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (error, profile: Profile) => {
            if (error || profile === undefined) return res.sendStatus(403);
            req.user = profile;
            next();
        }
    );
}
