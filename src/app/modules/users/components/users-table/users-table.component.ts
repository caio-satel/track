import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { UserDTO } from '../../../../DTO/users/userDTO';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
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
  @Output() userAdded = new EventEmitter<UserDTO>();
  @Output() userEdited = new EventEmitter<UpdateUserDTO>();
  @Output() userDeleted = new EventEmitter<number>();

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
    const target = event.target as HTMLInputElement;
    const value = target.value.trim().toLowerCase();
    this.dataSource.filter = value;
  }

  setCustomFilter() {
    this.dataSource.filterPredicate = (data: UserDTO, filter: string) => {
      return (
        data.name.includes(filter) ||
        data.email.includes(filter) ||
        data.role.includes(filter)
      );
    };
  }

  openFormDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(UsersFormComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userAdded.emit(result);
      }
    });
  }

  openEditDialog(user: UpdateUserDTO, enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(UsersFormComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userEdited.emit(result as UpdateUserDTO);
      }
    });
  }

  openDeleteDialog(userId: number, enterAnimationDuration: string, exitAnimationDuration: string): void {
    const user = this.users.find(u => u.id === userId);

    if(!user) {
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
        this.userDeleted.emit(userId);
      }
    });
  }
}
