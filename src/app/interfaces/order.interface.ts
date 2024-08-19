import { Customer } from "./customer.inteface";
import { OrderItem } from "./order-item.interface";
import { Restaurant } from "./restaurant.interface";

export interface Order {
    id: number;
    createdAt: Date;
    customer: Customer;
    total: number;
    items: OrderItem[];
    restaurant: Restaurant;
}