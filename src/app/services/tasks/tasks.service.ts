import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { HttpClient} from '@angular/common/http';
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

  constructor(private http: HttpClient) {}

  // GET - Listar todas as tasks
  getTasks(): Observable<TaskDTO[]> {
    return this.http.get<TaskDTO[]>(this.apiUrl);
  }

  // GET - Listar todas as tasks do usuário logado
  getTasksByUser(): Observable<TaskDTO[]> {
    return this.http.get<TaskDTO[]>(`${this.apiUrl}/byUser`);
  }

  // GET - Listar todas as tarefas atrasadas do usuário logado
  getLateTasksByUser(): Observable<TaskDTO[]> {
    const url = `${this.apiUrl}/late-tasks`;
    return this.http.get<TaskDTO[]>(url);
  }

  // GET - Buscar task filtrada por ID
  getTaskById(id: number): Observable<TaskDTO> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<TaskDTO>(url);
  }

  // POST - Cadastrar task
  createTask(task: CreateTaskDTO): Observable<CreateTaskDTO> {
    return this.http.post<CreateTaskDTO>(this.apiUrl, task);
  }

  // PUT - Atualizar task
  updateTask(id: number, task: UpdateTaskDTO): Observable<UpdateTaskDTO> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<UpdateTaskDTO>(url, task);
  }

  // DELETE - Deletar task
  deleteTask(id: number): Observable<Task> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Task>(url);
  }

  // GET - Obter detalhes das tasks, usuários e projetos
  getUserTaskProjectDetails(): Observable<any[]> {
    const url = `${this.apiUrl}/details`;
    return this.http.get<any[]>(url);
  }
}
