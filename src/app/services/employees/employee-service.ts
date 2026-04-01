import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Auth } from '../auth';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private baseUrl = 'http://localhost:8080';
  private adminUrl = '/api/admin/employees';
  private employeeUrl = '/api/employees';

  private http = inject(HttpClient);
  private auth = inject(Auth);

  role = this.auth.getRole();

  getAll() {
    const url =
      this.role === 'ADMIN' || this.role === 'MANAGER' ? this.baseUrl + this.employeeUrl : this.employeeUrl;
    return this.http.get<any[]>(url);
  }

  create(dto: any) {
    return this.http.post<any>(`${this.baseUrl}${this.adminUrl}`, dto);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}${this.adminUrl}/${id}`, { responseType: 'text' });
  }

  update(id: number, dto: any) {
    return this.http.put<any>(`${this.baseUrl}${this.adminUrl}/${id}`, dto);
  }
}
