import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
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
    private http: HttpClient
  ) {}

  // GET - Listar todas as releases
  getReleases(): Observable<ReleaseDTO[]> {
    return this.http.get<ReleaseDTO[]>(this.apiUrl);
  }

  // GET - Buscar release filtrada por ID
  getReleaseById(id: number): Observable<ReleaseDTO> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<ReleaseDTO>(url);
  }

  // GET - Buscar releases do usuário logado
  getReleasesByUserLogged(): Observable<ReleaseDTO[]> {
    const url = `${this.apiUrl}/byUser`;
    return this.http.get<ReleaseDTO[]>(url);
  }

  // POST - Cadastrar release
  createRelease(release: CreateReleaseDTO): Observable<CreateReleaseDTO> {
    return this.http.post<CreateReleaseDTO>(this.apiUrl, release);
  }

  // PUT - Atualizar release
  updateRelease(id: number, release: UpdateReleaseDTO): Observable<UpdateReleaseDTO> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<UpdateReleaseDTO>(url, release);
  }

  // DELETE - Deletar release
  deleteRelease(id: number): Observable<Release> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Release>(url);
  }

  // GET - Total de releases e horas lançadas pelo usuário
  totalReleasesAndHoursLaunchedByUser(): Observable<any[]> {
    const url = `${this.apiUrl}/user-launches`;
    return this.http.get<any[]>(url);
  }
}
