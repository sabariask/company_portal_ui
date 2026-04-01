import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Auth } from '../auth';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private baseURL = 'http://localhost:8080';
  private adminUrl = '/api/admin/departments';
  private departmentUrl = '/api/departments';

  private http = inject(HttpClient);
  private auth = inject(Auth);

  role = this.auth.getRole();

  getDepartments() {
    const url =
      this.role === 'ADMIN' || this.role === 'MANAGER' ? this.baseURL + this.departmentUrl : '';
    return this.http.get<any>(url);
  }

  createDepartment(dto: any) {
    return this.http.post<any>(`${this.baseURL}${this.adminUrl}`, dto);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseURL}${this.adminUrl}/${id}`, { responseType: 'text' });
  }

  getDepartmentById(id: number) {
    return this.http.get<any>(`${this.baseURL}${this.adminUrl}/${id}`);
  }
}
