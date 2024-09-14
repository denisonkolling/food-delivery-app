import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/auth';
import { catchError, Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { BASE_URL } from '../shared/constants/base-url.constants'
import { TokenService } from './token.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService,
  ) { }

  registerUser(userDetails: User) {
    return this.http.post(`${BASE_URL.BASE_URL}/users`, userDetails);
  }

  getUserByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${BASE_URL.BASE_URL}/users?email=${email}`);
  }

  login(email: string, password: string): Observable<{ access_token: string }> {
    return this.http.post<{ access_token: string }>(`${BASE_URL.BASE_URL}/login`, { email, password }).pipe(
      tap(response => {
        if (response.access_token) {
          this.tokenService.storeToken(response.access_token);
        }
      }),
      catchError(error => {
        console.error('Login error', error);
        return throwError(() => new Error('Login failed'));
      })
    );
  }

  logout() {
    sessionStorage.removeItem('access_token');
    this.router.navigate(['login']);
  }

  isLogged() {
    return this.tokenService.hasToken();
  }
}
