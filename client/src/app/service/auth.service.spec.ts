import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8086';

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    const basicAuth = 'Basic ' + btoa(username + ':' + password);
    localStorage.setItem('authToken', basicAuth);
    localStorage.setItem('username', username);
  }

  logout() {
    localStorage.clear();
  }

  getToken() {
    return localStorage.getItem('authToken');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }
}