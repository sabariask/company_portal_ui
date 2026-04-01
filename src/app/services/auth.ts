import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private baseUrl = "http://localhost:8080/auth";

  constructor(private http: HttpClient) { }

  login(request: any) {
    return this.http.post<any>(`${this.baseUrl}/login`, request);
  }

  register(request: any) {
    return this.http.post(`${this.baseUrl}/register`, request);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string {
    const token =  this.getToken();
    if(!token) return '';

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role;
  }

  getUsername(): string {
    const token = this.getToken();
    if(!token) return '';

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.sub || payload.username || '';
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
