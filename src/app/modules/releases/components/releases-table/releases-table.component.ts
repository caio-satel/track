import { Component, inject, ViewChild } from '@angular/core';
import { ReleaseDTO } from '../../../../DTO/releases/releaseDTO';
import { SnackbarService } from '../../../../shared/snackbar/services/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { ReleasesFormComponent } from '../releases-form/releases-form.component';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-releases-table',
  templateUrl: './releases-table.component.html',
  styleUrl: './releases-table.component.css'
})
export class ReleasesTableComponent {
  snackbar: SnackbarService = inject(SnackbarService);
  dialog: MatDialog = inject(MatDialog);
  columns: string[] = ['taskId', 'userId', 'description', 'startDate', 'endDate', 'createdAt', 'actions'];

  releases: ReleaseDTO[] = [
    {
      id: 1,
      taskId: 1,
      userId: 1,
      description: 'Release Teste',
      startDate: new Date('2021-01-01'),
      endDate: new Date('2021-12-31')
    },
    {
      id: 2,
      taskId: 2,
      userId: 2,
      description: 'Release Teste 2',
      startDate: new Date('2021-01-02'),
      endDate: new Date('2021-12-31')
    },
    {
      id: 3,
      taskId: 3,
      userId: 3,
      description: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      startDate: new Date('2021-01-03'),
      endDate: new Date('2021-12-31')
    }
  ];

  dataSource = new MatTableDataSource<ReleaseDTO>(this.releases);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

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
    this.dataSource.filterPredicate = (data: ReleaseDTO, filter: string) => {
      return (
        data.description.includes(filter)
      );
    };
  }

  // Função para abrir o dialog de criação de nova release
  openFormDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    // console.log('entrou na função form');
    this.dialog.open(ReleasesFormComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  // Função para editar uma release
  openEditDialog(release: ReleaseDTO, enterAnimationDuration: string, exitAnimationDuration: string): void {
    console.log(release);
    this.dialog.open(ReleasesFormComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        release
      }
    });
  }

  // Função para abrir o dialog de confirmação
  openDeleteDialog(releaseId: number, enterAnimationDuration: string, exitAnimationDuration: string): void {
    // console.log('entrou na função', releaseId);
    // Busca o release na lista pelo ID
    const release = this.releases.find(r => r.id === releaseId);

    if (!release) {
      // Se a release não existir na lista, exibe uma mensagem de erro
      this.snackbar.openSnackBar('Release não encontrada!', 'warning');
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Excluir Release',
        message: `Tem certeza que deseja excluir ${release.description}?`, // Nome dinâmico
        enterAnimationDuration,
        exitAnimationDuration
      }
    });

    // Se o dialog for confirmar, chamamos a função de exclusão
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteRelease(releaseId);
      }
    });
  }

  // Função para excluir uma release
  deleteRelease(releaseId: number) {
    // console.log('Release excluída:', releaseId);
    this.snackbar.openSnackBar('Release excluída com sucesso!', 'success');
    // Chamar o service para excluir a release no backend
  }
}
