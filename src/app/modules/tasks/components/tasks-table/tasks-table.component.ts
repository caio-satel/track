import { Component, inject, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TaskDTO } from '../../../../DTO/tasks/taskDTO';
import { StatusTask } from '../../../../models/enum/statusTask.enum';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TasksFormComponent } from '../tasks-form/tasks-form.component';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';
import { SnackbarService } from '../../../../shared/snackbar/services/snackbar.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-tasks-table',
  templateUrl: './tasks-table.component.html',
  styleUrl: './tasks-table.component.css'
})
export class TasksTableComponent {
  snackbar: SnackbarService = inject(SnackbarService);
  dialog: MatDialog = inject(MatDialog);
  columns = ['name', 'projectId', 'userResponsibleId', 'startDate', 'endDate', 'status', 'actions'];

  // Mock de dados
  tasks: TaskDTO[] = [
    {
      id: 1,
      projectId: 1,
      userResponsibleId: 2,
      name: 'Task 1',
      startDate: new Date(),
      endDate: new Date(),
      status: StatusTask.PAUSED
    },
    {
      id: 2,
      projectId: 1,
      userResponsibleId: 1,
      name: 'Task 2',
      startDate: new Date(),
      endDate: new Date(),
      status: StatusTask.PROGRESS
    },
    {
      id: 3,
      projectId: 1,
      userResponsibleId: 1,
      name: 'Task 3',
      startDate: new Date(),
      endDate: new Date(),
      status: StatusTask.OPEN
    },
    {
      id: 4,
      projectId: 2,
      userResponsibleId: 3,
      name: 'Task 4',
      startDate: new Date(),
      endDate: new Date(),
      status: StatusTask.DONE
    },
  ];

  // MatPaginator e MatSort
  dataSource = new MatTableDataSource<TaskDTO>(this.tasks);
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
    this.dataSource.filterPredicate = (data: TaskDTO, filter: string) => {
      return (
        data.name.includes(filter) ||
        data.status.includes(filter)
      );
    };
  }

  // Função para abrir o dialog de criação de nova task
  openFormDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    // console.log('entrou na função form');
    this.dialog.open(TasksFormComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  // Função para editar uma atividade
  openEditDialog(task: TaskDTO, enterAnimationDuration: string, exitAnimationDuration: string): void {
    console.log(task);
    this.dialog.open(TasksFormComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        task
      }
    });
  }

  // Função para abrir o dialog de confirmação
  openDeleteDialog(taskId: number, enterAnimationDuration: string, exitAnimationDuration: string): void {
    // console.log('entrou na função', taskId);
    // Busca o atividade na lista pelo ID
    const task = this.tasks.find(t => t.id === taskId);

    if (!task) {
      // Se a atividade não existir na lista, exibe uma mensagem de erro
      this.snackbar.openSnackBar('Atividade não encontrada!', 'warning');
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Excluir Atividade',
        message: `Tem certeza que deseja excluir ${task.name}?`, // Nome dinâmico
        enterAnimationDuration,
        exitAnimationDuration
      }
    });

    // Se o dialog for confirmar, chamamos a função de exclusão
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteTask(taskId);
      }
    });
  }

  // Função para excluir um atividade
  deleteTask(taskId: number) {
    // console.log('Atividade excluída:', taskId);
    this.snackbar.openSnackBar('Atividade excluída com sucesso!', 'success');
    // Chamar o service para excluir a atividade no backend
  }

}
