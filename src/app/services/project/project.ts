import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Project } from '../../model/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private http = inject(HttpClient);

  private readUrl = "http://localhost:8080/api/projects";
  private writeUrl = "http://localhost:8080/api/manager/projects";

  getAllProjects() {
    return this.http.get<Project[]>(this.readUrl);
  }

  createProject(project: Project) {
    return this.http.post<Project>(this.writeUrl, project);
  }

  updateProject(id:number, project: Project) {
    return this.http.put<Project>(`${this.writeUrl}/${id}`, project);
  }

  deleteProject(id: number) {
    return this.http.delete(`${this.writeUrl}/${id}`);
  }
}
