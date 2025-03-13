import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectDTO } from '../../DTO/projects/projectDTO';
import { UpdateProjectDTO } from '../../DTO/projects/UpdateProjectDTO';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private apiUrl = `${environment.api_URL}/projects`;

  constructor(private http: HttpClient) { }

  // GET - Listar todos os projetos
  getProjects(): Observable<ProjectDTO[]> {
    return this.http.get<ProjectDTO[]>(this.apiUrl);
  }

  // GET - Buscar projeto filtrado por ID
  getProjectById(id: number): Observable<ProjectDTO> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<ProjectDTO>(url);
  }

  // POST - Cadastrar projeto
  createProject(newProject: ProjectDTO): Observable<ProjectDTO> {
    return this.http.post<ProjectDTO>(this.apiUrl, newProject);
  }

  // PUT - Atualizar projeto
  updateProject(id: number, projectUpdated: UpdateProjectDTO): Observable<UpdateProjectDTO> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<UpdateProjectDTO>(url, projectUpdated);
  }

  // DELETE - Deletar projeto
  deleteProject(id: number): Observable<ProjectDTO> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<ProjectDTO>(url);
  }

  // Relatórios de projetos
  totalHoursLaunchedByProjects30days(): Observable<any[]> {
    const url = `${this.apiUrl}/total-hours-last-30-days`;
    return this.http.get<any[]>(url);
  }

  countOngoingTasksByProjects(): Observable<any[]> {
    const url = `${this.apiUrl}/ongoing-tasks`;
    return this.http.get<any[]>(url);
  }
}
