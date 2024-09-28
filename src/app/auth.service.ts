import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private readonly tokenKey = 'authToken';

  constructor() {
    this.isAuthenticated = !!localStorage.getItem(this.tokenKey); // checking if the token exist here
  }

  login(username: string, password: string): boolean {
    const hardcodedUsername = 'admin';
    const hardcodedPassword = 'password123';

    if (username === hardcodedUsername && password === hardcodedPassword) {
      const token = 'randomNewtoken123'; //token
      localStorage.setItem(this.tokenKey, token); // Storing token in local storage
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem(this.tokenKey); // Remove token from localStorage
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey); // Get the token from localStorage
  }
}
