import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../authentication/auth.service';
import { TaskDTO } from '../../DTO/tasks/taskDTO';
import { Observable } from 'rxjs';
import { CreateTaskDTO } from '../../DTO/tasks/CreateTaskDTO';
import { UpdateTaskDTO } from '../../DTO/tasks/UpdateTaskDTO';
import { Task } from 'zone.js/lib/zone-impl';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private apiUrl = `${environment.api_URL}/tasks`;

  constructor(private http: HttpClient, private auth: AuthService) { }

  // Crud Tasks
  // GET - Listar todas as tasks
  getTasks(): Observable<TaskDTO[]> {
    const token = this.auth.getToken();

    // Se não houver token, retorna um erro
    if (!token) {
      console.error('Não foi possível obter o token');
    }

    // Define os headers com o token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<TaskDTO[]>(this.apiUrl, { headers });
  }

  // GET - Listar todas as tasks do usuário logado
  getTasksByUser(): Observable<TaskDTO[]> {
    const token = this.auth.getToken();

    if (!token) {
      console.error('Não foi possível obter o token');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<TaskDTO[]>(`${this.apiUrl}/byUser`, { headers });
  }

  getLateTasksByUser(): Observable<TaskDTO[]> {
    const token = this.auth.getToken();

    if (!token) {
      console.error('Não foi possível obter o token');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<TaskDTO[]>(`${this.apiUrl}/late-tasks`, { headers });
  }

  // GET - Buscar task filtrada por ID
  getTaskById(id: number): Observable<TaskDTO> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<TaskDTO>(url);
  }

  // POST - Cadastrar task
  createTask(task: CreateTaskDTO): Observable<CreateTaskDTO> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<CreateTaskDTO>(this.apiUrl, task, { headers });
  }

  // PUT - Atualizar task
  updateTask(id: number, user: UpdateTaskDTO): Observable<UpdateTaskDTO> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<UpdateTaskDTO>(url, user, { headers });
  }

  // DELETE - Deletar task
  deleteTask(id: number): Observable<Task> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Task>(url, { headers });
  }
}
