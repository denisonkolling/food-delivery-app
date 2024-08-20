import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/order.interface';
import { BASE_URL } from '../shared/constants/base-url.constants'



@Injectable()
export class OrderService {

    constructor(
        private http: HttpClient,
    ) { }


    findAllOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(`${BASE_URL}/orders`);
    }
}
