import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { UserDTO } from '../../../../DTO/users/userDTO';
import { Perfil } from '../../../../models/enum/perfil.enum';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { UsersFormComponent } from '../users-form/users-form.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';
import { SnackbarService } from '../../../../shared/snackbar/services/snackbar.service';


@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css',
})
export class UsersTableComponent implements OnInit, AfterViewInit {
  // Injeções de dependência
  constructor(private snackbar: SnackbarService, private dialog: MatDialog) {}

  ngOnInit(): void {
    // Aplica o filtro customizado
    this.setCustomFilter();
    //Implementar a lógica com services para buscar todos os usuários no DB
  }

  // Mock de dados
  users: UserDTO[] = [
    {
      id: 1,
      name: 'Caio',
      email: 'teste@teste.com',
      perfil: Perfil.ADMIN,
    },
    {
      id: 2,
      name: 'Jesus',
      email: 'jesus@gmail.com',
      perfil: Perfil.USER,
    },
    {
      id: 3,
      name: 'Jose',
      email: 'jose@gmail.com',
      perfil: Perfil.USER,
    },
    {
      id: 4,
      name: 'Caio',
      email: 'caio@gmail.com',
      perfil: Perfil.ADMIN,
    },
    {
      id: 5,
      name: 'Jesus',
      email: 'jesus@gmail.com',
      perfil: Perfil.USER,
    },
    {
      id: 6,
      name: 'Jose',
      email: 'jose@gmail.com',
      perfil: Perfil.USER,
    },
    {
      id: 7,
      name: 'Caio',
      email: 'caio@gmail.com',
      perfil: Perfil.ADMIN,
    },
    {
      id: 8,
      name: 'Jesus',
      email: 'jesus@gmail.com',
      perfil: Perfil.USER,
    },
    {
      id: 9,
      name: 'Jose',
      email: 'jose@gmail.com',
      perfil: Perfil.USER,
    },
    {
      id: 10,
      name: 'Caio',
      email: 'caio@gmail.com',
      perfil: Perfil.ADMIN,
    },
    {
      id: 11,
      name: 'Jesus',
      email: 'jesus@gmail.com',
      perfil: Perfil.USER,
    },
    {
      id: 12,
      name: 'Jose',
      email: 'jose@gmail.com',
      perfil: Perfil.USER,
    },
    {
      id: 13,
      name: 'Caio',
      email: 'caio@gmail.com',
      perfil: Perfil.ADMIN,
    },
    {
      id: 14,
      name: 'Jesus',
      email: 'jesus@gmail.com',
      perfil: Perfil.USER,
    },
    {
      id: 15,
      name: 'Jose',
      email: 'jose@gmail.com',
      perfil: Perfil.USER,
    },
    {
      id: 16,
      name: 'Caio',
      email: 'caio@gmail.com',
      perfil: Perfil.ADMIN,
    },
    {
      id: 17,
      name: 'Jesus',
      email: 'jesus@gmail.com',
      perfil: Perfil.USER,
    },
  ];
  usersGeral!: UserDTO[];

  // Lista de colunas para a tabela
  columns: string[] = ['name', 'email', 'perfil', 'actions'];

  // MatPaginator e MatSort
  dataSource = new MatTableDataSource<UserDTO>(this.users);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  // Função para filtrar os dados
  search(event: Event) {
    // Recebe o evento de INPUT - Toda vez que algo é digitado no input, ele é capturado
    const target = event.target as HTMLInputElement;
    // Transforma o value do input em string (todos os caracteres ficam minúsculos e sem espaços)
    const value = target.value.trim().toLowerCase();
    // Aplica o filtro ao dataSource
    this.dataSource.filter = value;
  }

  // Função para aplicar filtro customizado
  setCustomFilter() {
    this.dataSource.filterPredicate = (data: UserDTO, filter: string) => {
      const lowerFilter = filter.trim().toLowerCase();
      return (
        data.name.toLowerCase().includes(lowerFilter) ||
        data.email.toLowerCase().includes(lowerFilter) ||
        data.perfil.toLowerCase().includes(lowerFilter)
      );
    };
  }

  // Função para abrir o dialog de criação de novo usuário
  openFormDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    // console.log('entrou na função form');
    this.dialog.open(UsersFormComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  // Função para editar um usuário
  openEditDialog(user: UserDTO, enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(UsersFormComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        user
      }
    });
  }

  // Função para abrir o dialog de confirmação
  openDeleteDialog(userId: number, enterAnimationDuration: string, exitAnimationDuration: string): void {
    // console.log('entrou na função', userId);

    // Busca o usuário na lista pelo ID
    const user = this.users.find(u => u.id === userId);

    if (!user) {
      // Se o usuário não existir na lista, exibe uma mensagem de erro
      this.snackbar.openSnackBar('Usuário não encontrado!', 'warning');
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Excluir Usuário',
        message: `Tem certeza que deseja excluir ${user.name}?`, // Nome dinâmico
        enterAnimationDuration,
        exitAnimationDuration
      }
    });

    // Se o usuário confirmar, chamamos a função de exclusão
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser(userId);
      }
    });
  }

  // Função para excluir um usuário
  deleteUser(userId: number) {
    // console.log('Usuário excluído:', userId);
    this.snackbar.openSnackBar('Usuário excluído com sucesso!', 'success');
    // Chamar o service para excluir o usuário no backend
  }

}
