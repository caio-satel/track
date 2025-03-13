import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { DashboardProjectDTO } from '../../DTO/projects/DashboardProjectDTO';
import { LateTasksCountDTO } from '../../DTO/dashboard/LateTasksCountDTO';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = `${environment.api_URL}/dashboard`;

  constructor(
    private http: HttpClient,
  ) {}

  // GET - Projetos e tarefas do usuário logado
  getProjectsAndTasksByUserLogged(): Observable<DashboardProjectDTO[]> {
    const url = `${this.apiUrl}/byUser`;
    return this.http.get<DashboardProjectDTO[]>(url);
  }

  // GET - Total de horas trabalhadas pelo usuário logado
  getHoursWorkedByUserLogged(): Observable<string> {
    const url = `${this.apiUrl}/hoursWorked`;
    return this.http.get<{ totalHours: string }>(url).pipe(
      map(response => response.totalHours)
    );
  }

  // GET - Contagem de tarefas atrasadas do usuário logado
  getLateTasksCountByUserLogged(): Observable<LateTasksCountDTO> {
    const url = `${this.apiUrl}/lateTasks`;
    return this.http.get<LateTasksCountDTO>(url);
  }
}
