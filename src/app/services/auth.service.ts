import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000'

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  registerUser(userDetails: User) {
    return this.http.post(`${this.baseUrl}/users`, userDetails);
  }

  getUserByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users?email=${email}`);
  }

  logoutUser() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}
