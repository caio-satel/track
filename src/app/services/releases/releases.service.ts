import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../authentication/auth.service';
import { Observable } from 'rxjs';
import { ReleaseDTO } from '../../DTO/releases/releaseDTO';
import { Release } from '../../models/releases/release';
import { CreateReleaseDTO } from '../../DTO/releases/CreateReleaseDTO';
import { UpdateReleaseDTO } from '../../DTO/releases/UpdateReleaseDTO';

@Injectable({
  providedIn: 'root'
})
export class ReleasesService {
private apiUrl = `${environment.api_URL}/releases`;

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  // Crud Releases
  // GET - Listar todas as releases
  getReleases(): Observable<ReleaseDTO[]> {
    const token = this.auth.getToken();

    if (!token) {
      console.error('Não foi possível obter o token');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<ReleaseDTO[]>(this.apiUrl, { headers });
  }

  // GET - Buscar release filtrada por ID
  getReleaseById(id: number): Observable<ReleaseDTO> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<ReleaseDTO>(url);
  }

  // GET - Buscar release filtrada por user logged
  getReleasesByUserLogged(): Observable<ReleaseDTO[]> {
    const token = this.auth.getToken();

    if (!token) {
      console.error('Não foi possível obter o token');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const url = `${this.apiUrl}/byUser`;
    return this.http.get<ReleaseDTO[]>(url, { headers });
  }

  // POST - Cadastrar release
  createRelease(release: CreateReleaseDTO): Observable<CreateReleaseDTO> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<CreateReleaseDTO>(this.apiUrl, release, { headers });
  }

  // PUT - Atualizar release
  updateRelease(id: number, release: UpdateReleaseDTO): Observable<UpdateReleaseDTO> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<UpdateReleaseDTO>(url, release, { headers });
  }

  // DELETE - Deletar release
  deleteRelease(id: number): Observable<Release> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Release>(url, { headers });
  }

  totalReleasesAndHoursLaunchedByUser(): Observable<any[]> {
    const token = this.auth.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const url = `${this.apiUrl}/user-launches`;
    return this.http.get<any[]>(url, { headers });
  }
}
