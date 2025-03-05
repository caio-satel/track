import { Component, EventEmitter, inject, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TaskDTO } from '../../../../DTO/tasks/taskDTO';
import { StatusTask } from '../../../../models/enum/statusTask.enum';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TasksFormComponent } from '../tasks-form/tasks-form.component';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';
import { SnackbarService } from '../../../../shared/snackbar/services/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDTO } from '../../../../DTO/tasks/CreateTaskDTO';
import { UpdateTaskDTO } from '../../../../DTO/tasks/UpdateTaskDTO';
import { CollaboratorsModalComponent } from '../collaborators-modal/collaborators-modal.component';

@Component({
  selector: 'app-tasks-table',
  templateUrl: './tasks-table.component.html',
  styleUrl: './tasks-table.component.css'
})
export class TasksTableComponent {
  @Input() tasks: TaskDTO[] = [];
  @Output() taskAdded = new EventEmitter<CreateTaskDTO>();
  @Output() taskEdited = new EventEmitter<UpdateTaskDTO>();
  @Output() taskDeleted = new EventEmitter<number>();

  columns = ['name', 'projectId', 'startDate', 'endDate', 'status', 'actions'];

  dataSource = new MatTableDataSource<TaskDTO>(this.tasks);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private snackbar: SnackbarService,
    private dialog: MatDialog
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tasks']) {
      this.dataSource.data = this.tasks;
    }
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
    this.dataSource.filterPredicate = (data: TaskDTO, filter: string) => {
      return (
        data.name.includes(filter) ||
        data.status.includes(filter)
      );
    };
  }

  openFormDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(TasksFormComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskAdded.emit(result as CreateTaskDTO);
      }
    });
  }

  openEditDialog(task: UpdateTaskDTO, enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(TasksFormComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        task
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskEdited.emit(result as UpdateTaskDTO);
      }
    });
  }

  openDeleteDialog(taskId: number, enterAnimationDuration: string, exitAnimationDuration: string): void {
    const task = this.tasks.find(t => t.id === taskId);

    if (!task) {
      this.snackbar.openSnackBar('Atividade não encontrada!', 'warning');
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Excluir Atividade',
        message: `Tem certeza que deseja excluir a tarefa ${task.name}?`,
        enterAnimationDuration,
        exitAnimationDuration
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskDeleted.emit(taskId);
      }
    });
  }

  openCollaboratorsDialog(collaborators: any[], enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(CollaboratorsModalComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { collaborators }
    });
  }
}
