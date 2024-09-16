import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category.interface';
import { BASE_URL } from '../shared/constants/base-url.constants'

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient,
  ) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${BASE_URL.BASE_URL}/category`);
}

}
