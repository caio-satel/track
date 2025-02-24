import { inject, Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDTO } from '../../DTO/users/userDTO';
import { AddUserDTO } from '../../DTO/users/addUserDTO';
import { User } from '../../models/users/user';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  http: HttpClient = inject(HttpClient);
  private apiUrl = `${environment.api_URL}/users`;

  // Crud Users
  // GET - Listar todos os usuários
  getUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(this.apiUrl);
  }

  // GET - Buscar usuário filtrado por ID
  getUserById(id: number): Observable<UserDTO> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<UserDTO>(url);
  }

  // POST - Cadastrar usuário
  createUser(user: UserDTO): Observable<AddUserDTO> {
    return this.http.post<AddUserDTO>(this.apiUrl, user);
  }

  // PUT - Atualizar usuário
  updateUser(id: number, user: AddUserDTO): Observable<AddUserDTO> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<AddUserDTO>(url, user);
  }

  // DELETE - Deletar usuário
  deleteUser(id: number): Observable<User> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<User>(url);
  }

}
