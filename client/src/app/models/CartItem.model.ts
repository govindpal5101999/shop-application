import { Product } from './Product.model';

export interface CartItem {
    id: number;
    product: Product;   // 🔥 reference
    quantity: number;
    price: number;
    total: number;
}