import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../shared/constants/base-url.constants'
import { Restaurant } from '../interfaces/restaurant.interface';

@Injectable()
export class RestaurantService {

    constructor(
        private http: HttpClient,
    ) { }


    getRestaurants(): Observable<Restaurant[]> {
        return this.http.get<Restaurant[]>(`${BASE_URL.BASE_URL}/restaurants`);
    }

    getRestaurantById(restaurantId: string): Observable<any> {
        return this.http.get(`${BASE_URL.BASE_URL}/restaurants/${restaurantId}`);
    }
}