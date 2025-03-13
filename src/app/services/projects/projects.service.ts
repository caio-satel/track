import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../authentication/auth.service';
import { Observable } from 'rxjs';
import { ProjectDTO } from '../../DTO/projects/projectDTO';
import { UpdateProjectDTO } from '../../DTO/projects/UpdateProjectDTO';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
private apiUrl = `${environment.api_URL}/projects`;

  constructor(private http: HttpClient, private auth: AuthService) { }

  // Crud Projects
  // GET - Listar todos os projetos
  getProjects(): Observable<ProjectDTO[]> {
    const token = this.auth.getToken();
    if (!token) {
      console.error('Não foi possível obter o token');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<ProjectDTO[]>(this.apiUrl, { headers });
  }

  // GET - Buscar projeto filtrado por ID
  getProjectById(id: number): Observable<ProjectDTO> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<ProjectDTO>(url);
  }

  // POST - Cadastrar projeto
  createProject(newProject: ProjectDTO): Observable<ProjectDTO> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<ProjectDTO>(this.apiUrl, newProject, { headers });
  }

  // PUT - Atualizar projeto
  updateProject(id: number, projectUdpdated: UpdateProjectDTO): Observable<UpdateProjectDTO> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<UpdateProjectDTO>(url, projectUdpdated, { headers });
  }

  // DELETE - Deletar projeto
  deleteProject(id: number): Observable<ProjectDTO> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<ProjectDTO>(url, { headers });
  }

  totalHoursLaunchedByProjects30days(): Observable<any[]> {
    const token = this.auth.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const url = `${this.apiUrl}/total-hours-last-30-days`;
    return this.http.get<any[]>(url, { headers });
  }

  countOngoingTasksByProjects(): Observable<any[]> {
    const token = this.auth.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const url = `${this.apiUrl}/ongoing-tasks`;
    return this.http.get<any[]>(url, { headers });
  }
}
