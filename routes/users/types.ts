import { Request } from 'express';
import { Profile } from '../../db/users/types';

export interface WithUserRequest extends Request {
    user: Profile;
}
