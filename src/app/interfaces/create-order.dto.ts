import { OrderItemDto } from "./order-item.dto";

export interface CreateOrderDto {
    customerId: number;
    restaurantId: number;
    status: string;
    items: OrderItemDto[];
}