import { Profile, User, UserCart } from './types';

import bcrypt from 'bcryptjs';

const users: User[] = [];
const profiles: Profile[] = [];
const usersCarts: UserCart[] = [];

const SALT_LENGTH = 10;

export function getAllUsers() {
    return profiles;
}

export async function addNewUser(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, SALT_LENGTH);
    const userId = users.length;
    const user = { userId, password: hashedPassword };
    const profile = { userId, email };
    users.push(user);
    profiles.push(profile);
    return { user, profile };
}

export function getProfileByEmail(userEmail: string) {
    const profile = profiles.filter(({ email }) => email === userEmail)[0];
    return profile;
}

export function getUserByEmail(userEmail: string) {
    const profile = getProfileByEmail(userEmail);
    const user =
        !!profile && users.filter(({ userId }) => userId === profile.userId)[0];
    return user && profile && { user, profile };
}

export function addProductToCart(userId: number, productId: string) {
    const cart = usersCarts.filter((cart) => userId === cart.userId)[0];

    if (cart === undefined)
        usersCarts.push({ userId, products: [{ productId, total: 1 }] });
    if (cart !== undefined) {
        const product = cart.products.filter(
            (product) => productId === product.productId
        )[0];
        if (product === undefined) {
            cart.products.push({ productId, total: 1 });
            return 1;
        }
        if (product !== undefined) product.total++;

        return product.total;
    }
}

export function removeProductFromCart(userId: number, productId: string) {
    const cart = usersCarts.filter((cart) => userId === cart.userId)[0];
    if (cart === undefined) return;

    const index = cart.products.findIndex(
        (product) => productId === product.productId
    );

    if (index === -1) return 0;
    cart.products[index].total--;
    if (cart.products[index].total <= 0) {
        cart.products.splice(index, 1);
        return 0;
    }

    return cart.products[index].total;
}

export function getUserCart(userId: number) {
    const cart = usersCarts.filter((cart) => userId === cart.userId)[0];
    return cart === undefined ? [] : cart.products;
}
