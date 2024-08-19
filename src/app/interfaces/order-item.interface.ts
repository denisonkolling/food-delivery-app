import { Product } from "./product.interface";

export interface OrderItem {
    id: number;
    product: Product;
    quantity: number;
    price: number;
}