import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { Observable, tap } from 'rxjs';
import { loginRequestDTO } from '../../DTO/users/loginRequestDTO';
import { loginResponseTokenDTO } from '../../DTO/users/loginResponseTokenDTO';
import { AddUserDTO } from '../../DTO/users/addUserDTO';
import { AddUserResponseDTO } from '../../DTO/users/addUserResponseDTO';

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http: HttpClient = inject(HttpClient);
  CookieService: CookieService = inject(CookieService);
  private apiUrl = `${environment.api_URL}`;
  private urlLogin = `${this.apiUrl}/auth/login`;
  private urlRegister = `${this.apiUrl}/auth/register`;

  login(data: loginRequestDTO): Observable<loginResponseTokenDTO> {
    return this.http.post<loginResponseTokenDTO>(this.urlLogin, data);
  }

  register(data: AddUserDTO): Observable<AddUserResponseDTO> {
    return this.http.post<AddUserResponseDTO>(this.urlRegister, data, { headers });
  }

  isLoggedIn(): boolean {
    // Verifica se o token/cookie está presente ou não
    const token = this.CookieService.get('token');
    return !!token; // Mesma coisa que: token ? true : false;
  }

  getToken(): string | null {
    const token = this.CookieService.get('token');
    return token;
  }
}
