import { Component, OnInit } from '@angular/core';
import { UserDTO } from '../../../DTO/users/userDTO';
import { UsersService } from '../../../services/users/users.service';
import { SnackbarService } from '../../../shared/snackbar/services/snackbar.service';
import { UpdateUserDTO } from '../../../DTO/users/updateUserDTO';
import { Perfil } from '../../../models/enum/perfil.enum';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users: UserDTO[] = [];

  constructor(private userServices: UsersService, private snackbar: SnackbarService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userServices.getUsers().subscribe({
      next: (response) => {
        this.users = response;
      },
      error: (err) => console.error('Erro ao buscar usuários:', err)
    });
  }

  onUserDeleted(userId: number) {
    this.userServices.deleteUser(userId).subscribe({
      next: (response) => {
        if(response) {
          this.loadUsers();
          this.users = this.users.filter(user => user.id !== userId);
        }
      },
      error: (err) => console.error('Erro ao excluir o usuário:', err)
    });
  }

  onUserAdded(newUser: UserDTO) {
    this.userServices.createUser(newUser).subscribe({
      next: (response) => {
        if(response) {
          this.loadUsers();
          this.users = [...this.users, response];
        }
      },
      error: (err) => console.error('Erro ao cadastrar o usuário:', err)
    });
  }

  onUserEdited(updatedUser: UpdateUserDTO) {
    this.userServices.updateUser(updatedUser.id, updatedUser).subscribe({
      next: () => {
        this.users = this.users.map(user => {
          if (user.id === updatedUser.id) {
            return { ...user, role: updatedUser.role } as UserDTO;
          }
          return user;
        });
      },
      error: (err) => console.error('Erro ao atualizar o usuário:', err)
    });
  }


}
