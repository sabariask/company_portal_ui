import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Task } from '../../model/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private baseUrl = 'http://localhost:8080/api';

  private http = inject(HttpClient);

  getTasks() {
    return this.http.get<Task[]>(`${this.baseUrl}/tasks`);
  }

  createTask(dto: any) {
    return this.http.post(`${this.baseUrl}/manager/tasks`, dto);
  }

  deleteTask(id: number) {
    return this.http.delete(`${this.baseUrl}/manager/tasks/${id}`, { responseType: 'text' });
  }

  updateStatus(id: number, status: string) {
    return this.http.patch(`${this.baseUrl}/tasks/${id}/status?status=${status}`, {});
  }

  updateTasks(id: number, dto: any) {
    return this.http.put<any>(`${this.baseUrl}/manager/tasks/${id}`, dto);
  }
}
