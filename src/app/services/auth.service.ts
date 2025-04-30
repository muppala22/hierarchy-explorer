import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  // This is a simple authentication implementation
  // In a real application, you would want to use proper authentication with a backend
  login(username: string, password: string): boolean {
    // For demo purposes, accept any non-empty username/password
    if (username === 'admin' && password === 'blahtech') {
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
