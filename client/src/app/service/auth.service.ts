import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) { }

  // 🔹 Save user session
  setSession(username: string, role: string, token: any) {
    localStorage.setItem('username', username);
    localStorage.setItem('role', role);
    localStorage.setItem('token', token);
  }

  // 🔹 Check login
  isLoggedIn(): boolean {
    return !!localStorage.getItem('role');
  }

  // 🔹 Role check
  isAdmin(): boolean {
    return localStorage.getItem('role') === 'ADMIN';
  }

  isUser(): boolean {
    return localStorage.getItem('role') === 'USER';
  }

  // 🔹 Logout
  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('role');
  }

  // 🔹 Register
  register(username: string, password: string) {
    return this.http.post(this.baseUrl + '/register',
      { username, password },
      { responseType: 'text' });
  }

  // 🔹 Login
  login(username: string, password: string) {
    return this.http.post(this.baseUrl + '/login',
      { username, password });
  }
}