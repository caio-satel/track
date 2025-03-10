import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../authentication/auth.service';
import { map, Observable } from 'rxjs';
import { DashboardProjectDTO } from '../../DTO/projects/DashboardProjectDTO';
import { LateTasksCountDTO } from '../../DTO/dashboard/LateTasksCountDTO';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = `${environment.api_URL}/dashboard`;
  readonly token = this.auth.getToken();

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  getProjectsAndTasksByUserLogged(): Observable<DashboardProjectDTO[]> {
    const token = this.auth.getToken();

    if (!token) {
      console.error('Não foi possível obter o token');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const url = `${this.apiUrl}/byUser`;

    return this.http.get<DashboardProjectDTO[]>(url, { headers });
  }

  getHoursWorkedByUserLogged(): Observable<string> {
    if (!this.token) {
      console.error('Não foi possível obter o token');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    const url = `${this.apiUrl}/hoursWorked`;

    return this.http.get<{ totalHours: string }>(url, { headers }).pipe(map(response => response.totalHours));
  }

  getLateTasksByUserLogged(): Observable<LateTasksCountDTO> {
    if (!this.token) {
      console.error('Não foi possível obter o token');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    const url = `${this.apiUrl}/lateTasks`;

    return this.http.get<LateTasksCountDTO>(url, { headers });
  }
}
