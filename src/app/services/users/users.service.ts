import { inject, Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDTO } from '../../DTO/users/userDTO';
import { AddUserDTO } from '../../DTO/users/addUserDTO';
import { User } from '../../models/users/user';
import { AuthService } from '../authentication/auth.service';
import { UserLoggedNameDTO } from '../../DTO/users/userLoggedNameDTO';
import { UpdateUserDTO } from '../../DTO/users/updateUserDTO';
import { ChangePasswordDTO } from '../../DTO/users/ChangePasswordDTO';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = `${environment.api_URL}/users`;

  constructor(private http: HttpClient, private auth: AuthService) { }

  // Crud Users
  // GET - Listar todos os usuários
  getUsers(): Observable<UserDTO[]> {
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

    return this.http.get<UserDTO[]>(this.apiUrl, { headers });
  }

  // GET - Buscar usuário filtrado por ID
  getUserById(id: number): Observable<UserDTO> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<UserDTO>(url);
  }

  // GET - Buscar usuário logado
  getUserLogged(): Observable<UserLoggedNameDTO> {
    const url = `${this.apiUrl}/userLogged`;
    const token = this.auth.getToken();

    // Se não houver token, retorna um erro
    if (!token) {
      console.error('Não foi possível obter o token');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<UserLoggedNameDTO>(url, { headers });
  }

  // POST - Cadastrar usuário
  createUser(user: UserDTO): Observable<UserDTO> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<UserDTO>(this.apiUrl, user, { headers });
  }

  // PUT - Atualizar usuário
  updateUser(id: number, user: UpdateUserDTO): Observable<UpdateUserDTO> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const url = `${this.apiUrl}/role/${id}`;
    return this.http.put<UpdateUserDTO>(url, user, { headers });
  }

  // DELETE - Deletar usuário
  deleteUser(id: number): Observable<User> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<User>(url, { headers });
  }

  changePassword(changePasswordData: ChangePasswordDTO): Observable<ChangePasswordDTO> {
    const token = this.auth.getToken();

    if (!token) {
      console.error('Não foi possível obter o token');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const url = `${this.apiUrl}/change-password`;

    return this.http.patch<ChangePasswordDTO>(url, changePasswordData, { headers });
  }
}
