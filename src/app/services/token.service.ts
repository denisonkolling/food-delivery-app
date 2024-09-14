import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {

    private tokenKey = 'access_token';

    storeToken(token: string): void {
        sessionStorage.setItem(this.tokenKey, token);
    }

    getToken(): string | null {
        return sessionStorage.getItem(this.tokenKey);
    }

    removeToken(): void {
        sessionStorage.removeItem(this.tokenKey);
    }

    hasToken() {
        return !!this.getToken();
    }
}


