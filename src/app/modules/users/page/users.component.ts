import { Component, OnInit } from '@angular/core';
import { UserDTO } from '../../../DTO/users/userDTO';
import { UsersService } from '../../../services/users/users.service';
import { SnackbarService } from '../../../shared/snackbar/services/snackbar.service';
import { UpdateUserDTO } from '../../../DTO/users/updateUserDTO';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users: UserDTO[] = [];

  constructor(
    private userServices: UsersService,
    private snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userServices.getUsers().subscribe({
      next: (response) => {
        this.users = response;
      },
      error: () => this.snackbar.openSnackBar('Erro ao buscar usuários!', 'error')
    });
  }

  onUserAdded(newUser: UserDTO) {
    this.userServices.createUser(newUser).subscribe({
      next: (response) => {
        if(response) {
          this.users = [...this.users, response];
        }
        this.snackbar.openSnackBar('Usuário cadastrado com sucesso!', 'success');
      },
      error: () => this.snackbar.openSnackBar('Erro ao cadastrar usuário!', 'error')
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
        this.snackbar.openSnackBar('Usuário atualizado com sucesso!', 'success');
      },
      error: () => this.snackbar.openSnackBar('Erro ao atualizar usuário!', 'error')
    });
  }

  onUserDeleted(userId: number) {
    this.userServices.deleteUser(userId).subscribe({
      next: (response) => {
        if(response) {
          this.users = this.users.filter(user => user.id !== userId);
        }
        this.snackbar.openSnackBar('Usuário excluído com sucesso!', 'success');
      },
      error: () => this.snackbar.openSnackBar('Erro ao excluir usuário!', 'error')
    });
  }
}
