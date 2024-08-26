import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../shared/constants/base-url.constants'
import { Product } from '../interfaces/product.interface';

@Injectable()
export class ProductService {

    constructor(
        private http: HttpClient,
    ) { }


    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(`${BASE_URL.BASE_URL}/products`);
    }

    addProduct(data: any): Observable<any> {
        return this.http.post(`${BASE_URL.BASE_URL}/products`, data);
    }
}