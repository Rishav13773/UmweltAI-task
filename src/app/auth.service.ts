import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'authToken';

  constructor() {}

  login(username: string, password: string): boolean {
    const hardcodedUsername = 'admin';
    const hardcodedPassword = 'password123';

    if (username === hardcodedUsername && password === hardcodedPassword) {
      const token = 'randomNewtoken123';
      localStorage.setItem(this.tokenKey, token); // Storing token in localStorage
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem(this.tokenKey); // Remove token from localStorage
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey); // Get the token from localStorage
  }
}
