import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/order.interface';
import { BASE_URL } from '../shared/constants/base-url.constants'
import { CreateOrderDto } from '../interfaces/create-order.dto';



@Injectable()
export class OrderService {

    constructor(
        private http: HttpClient,
    ) { }


    findAllOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(`${BASE_URL.BASE_URL}/orders`);
    }

    findOrderById(id: number): Observable<Order> {
        return this.http.get<Order>(`${BASE_URL.BASE_URL}/orders/${id}`)
    }

    cancelOrderById(id: number): Observable<Order> {
        return this.http.delete<Order>(`${BASE_URL.BASE_URL}/orders/${id}`)
    }

    createOrder(order: CreateOrderDto): Observable<CreateOrderDto> {
        return this.http.post<Order>(`${BASE_URL.BASE_URL}/orders`, order)
    }


}

