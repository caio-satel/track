import { UsersService } from './../../../../services/users/users.service';
import { AfterViewInit, Component, EventEmitter, inject, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { UserDTO } from '../../../../DTO/users/userDTO';
import { Perfil } from '../../../../models/enum/perfil.enum';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { UsersFormComponent } from '../users-form/users-form.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';
import { SnackbarService } from '../../../../shared/snackbar/services/snackbar.service';
import { UpdateUserDTO } from '../../../../DTO/users/updateUserDTO';


@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css',
})
export class UsersTableComponent implements OnInit, AfterViewInit {
  @Input() users: UserDTO[] = [];
  @Output() userDeleted = new EventEmitter<number>();
  @Output() userAdded = new EventEmitter<UserDTO>();
  @Output() userEdited = new EventEmitter<UpdateUserDTO>();

  constructor(
    private dialog: MatDialog,
    private snackbar: SnackbarService,
  ) {}

  columns: string[] = ['name', 'email', 'role', 'actions'];

  dataSource = new MatTableDataSource<UserDTO>(this.users);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['users']) {
      this.dataSource.data = this.users;
    }
  }

  ngOnInit(): void {
    this.setCustomFilter();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  search(event: Event) {
    // Recebe o evento de INPUT - Toda vez que algo é digitado no input, ele é capturado
    const target = event.target as HTMLInputElement;
    // Transforma o value do input em string (todos os caracteres ficam minúsculos e sem espaços)
    const value = target.value.trim().toLowerCase();
    // Aplica o filtro ao dataSource
    this.dataSource.filter = value;
  }

  setCustomFilter() {
    this.dataSource.filterPredicate = (data: UserDTO, filter: string) => {
      const lowerFilter = filter.trim().toLowerCase();
      return (
        data.name.includes(lowerFilter) ||
        data.email.includes(lowerFilter) ||
        data.role.includes(lowerFilter)
      );
    };
  }

  // Função para abrir o dialog de criação de novo usuário
  openFormDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(UsersFormComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackbar.openSnackBar('Usuário cadastrado com sucesso!', 'success');
        this.userAdded.emit(result);
      }
    });
  }

  // Função para editar um usuário
  openEditDialog(user: UpdateUserDTO, enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(UsersFormComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackbar.openSnackBar('Usuário atualizado com sucesso!', 'success');
        this.userEdited.emit(result); // Apenas emite o resultado, pois já inclui o ID
      }
    });
  }

  // Função para abrir o dialog de confirmação
  openDeleteDialog(userId: number, enterAnimationDuration: string, exitAnimationDuration: string): void {
    const user = this.users.find(u => u.id === userId);

    if (!user) {
      this.snackbar.openSnackBar('Usuário não encontrado!', 'warning');
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Excluir Usuário',
        message: `Tem certeza que deseja excluir ${user.name}?`,
        enterAnimationDuration,
        exitAnimationDuration
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackbar.openSnackBar('Usuário excluído com sucesso!', 'success');
        this.users = this.users.filter(user => user.id !== userId);
        this.userDeleted.emit(userId);
      }
    });
  }
}
