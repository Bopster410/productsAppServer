import jwt from 'jsonwebtoken';
import { Profile } from '../../db/users/types';

export function generateAccessToken(profile: Profile) {
    return jwt.sign(profile, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1m',
    });
}
