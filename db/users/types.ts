export type User = {
    userId: number;
    password: string;
};

export type Profile = {
    userId: number;
    email: string;
};

export type UserCart = {
    userId: number;
    products: { productId: string; total: number }[];
};
