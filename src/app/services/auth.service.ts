import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { BASE_URL } from '../shared/constants/base-url.constants'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  registerUser(userDetails: User) {
    return this.http.post(`${BASE_URL}/users`, userDetails);
  }

  getUserByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${BASE_URL}/users?email=${email}`);
  }

  logoutUser() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}
