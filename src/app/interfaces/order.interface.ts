import { OrderStatus } from "../enums/order-status.enum";
import { OrderItem } from "./order-item.interface";

export interface Order {
    id: number;
    createdAt: Date;
    status: OrderStatus;
    total: number;
    customerId: number;
    customerName: string;
    restaurantId: number;
    restaurantName: string;
    items: OrderItem[];
}