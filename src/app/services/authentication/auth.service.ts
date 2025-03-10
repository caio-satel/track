import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { Observable } from 'rxjs';
import { loginRequestDTO } from '../../DTO/users/loginRequestDTO';
import { loginResponseTokenDTO } from '../../DTO/users/loginResponseTokenDTO';
import { AddUserDTO } from '../../DTO/users/addUserDTO';
import { AddUserResponseDTO } from '../../DTO/users/addUserResponseDTO';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.api_URL}`;
  private urlLogin = `${this.apiUrl}/auth/login`;

  constructor(
    private http: HttpClient,
    private CookieService: CookieService,
    private router: Router
  ) {}

  login(data: loginRequestDTO): Observable<loginResponseTokenDTO> {
    return this.http.post<loginResponseTokenDTO>(this.urlLogin, data);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    if (this.isTokenExpired(token)) {
      this.logout();
      return false;
    }

    return true;
  }

  getToken(): string | null {
    return this.CookieService.get('token');
  }

  logout(): void {
    this.CookieService.delete('token');
    this.router.navigate(['/login']);
  }

  private isTokenExpired(token: string): boolean {
    const payload = this.decodeToken(token);
    if (!payload || !payload.exp) return true;

    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(payload.exp);

    return expirationDate.valueOf() < new Date().valueOf();
  }

  private decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
  }
}
