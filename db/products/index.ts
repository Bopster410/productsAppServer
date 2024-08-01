import { products } from './constants';
import { Product } from './types';

export function getProducts() {
    return Array.from(products.values());
}

export function getProductById(id: string): Product {
    return products.get(id);
}
