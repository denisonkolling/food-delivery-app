import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../shared/constants/base-url.constants'
import { Customer } from '../interfaces/customer.inteface';

@Injectable()
export class CustomerService {

    constructor(
        private http: HttpClient,
    ) { }


    getCustomers(): Observable<Customer[]> {
        return this.http.get<Customer[]>(`${BASE_URL.BASE_URL}/customers`);
    }

    getCustomerById(customerId: string): Observable<any> {
        return this.http.get(`${BASE_URL.BASE_URL}/customers/${customerId}`);
    }
}
