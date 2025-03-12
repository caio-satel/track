import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../../../../shared/snackbar/services/snackbar.service';
import { UserDTO } from '../../../../DTO/users/userDTO';
import { ProjectDTO } from '../../../../DTO/projects/projectDTO';
import { UsersService } from '../../../../services/users/users.service';
import { ProjectsService } from '../../../../services/projects/projects.service';
import { format } from 'date-fns';
import { UpdateTaskDTO } from '../../../../DTO/tasks/UpdateTaskDTO';
import { StatusTask } from '../../../../models/enum/statusTask.enum';

@Component({
  selector: 'app-tasks-form',
  templateUrl: './tasks-form.component.html',
  styleUrl: './tasks-form.component.css'
})
export class TasksFormComponent implements OnInit {
  newTaskForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    startDate: new FormControl(null, [Validators.required]),
    endDate: new FormControl(null, [Validators.required]),
    projectId: new FormControl('', [Validators.required]),
    collaborators: new FormControl([], [Validators.required]),
  });

  editTaskForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    startDate: new FormControl(null, [Validators.required]),
    endDate: new FormControl(null, [Validators.required]),
    projectId: new FormControl('', [Validators.required]),
    collaborators: new FormControl([], [Validators.required]),
    status: new FormControl('', [Validators.required])
  });

  users: UserDTO[] = [];
  projects: ProjectDTO[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    readonly dialogRef: MatDialogRef<TasksFormComponent>,
    private userService: UsersService,
    private projectService: ProjectsService,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.usersList();
    this.projectsList();

    if (this.data?.task) {
      const startDate = this.convertToDate(this.data.task.startDate);
      const endDate = this.convertToDate(this.data.task.endDate);

      const collaboratorIds = this.data.task.collaborators.map((c: { id: number }) => c.id);

      this.editTaskForm.patchValue({
        name: this.data.task.name,
        startDate: startDate,
        endDate: endDate,
        projectId: this.data.task.project.id,
        collaborators: collaboratorIds,
        status: this.data.task.status
      });
    }
  }

  // Função para converter dd/MM/yyyy para Date
  convertToDate(dateString: string): Date {
    const [day, month, year] = dateString.split('/');
    return new Date(+year, +month - 1, +day);
  }

  // Função para converter Date para dd/MM/yyyy
  formatDateToDDMMYYYY(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  usersList(): void {
    this.userService.getUsers().subscribe({
      next: (response) => {
        this.users = response;
      },
      error: () => this.snackbar.openSnackBar('Erro ao buscar usuários!', 'error')
    });
  }

  projectsList(): void {
    this.projectService.getProjects().subscribe({
      next: (response) => {
        this.projects = response;
      },
      error: () => this.snackbar.openSnackBar('Erro ao buscar projetos!', 'error')
    });
  }

  addTask(): void {
    if (!this.newTaskForm.valid) {
      return this.snackbar.openSnackBar('Preencha todos os campos corretamente!', 'warning');
    }
    const formValue = this.newTaskForm.value;
    const formatDate = (date: Date) => format(date, 'dd/MM/yyyy');

    const payload = {
      name: formValue.name,
      startDate: formatDate(formValue.startDate),
      endDate: formatDate(formValue.endDate),
      projectId: formValue.projectId,
      collaborators: formValue.collaborators,
    };

    this.dialogRef.close(payload);
  }

  editTask(): void {
    if (!this.data?.task?.id) {
      this.snackbar.openSnackBar('Tarefa não encontrada!', 'error');
      return;
    }
    if (!this.editTaskForm.valid || !this.editTaskForm.value) {
      return this.snackbar.openSnackBar('Preencha todos os campos corretamente!', 'warning');
    }

    const formValue = this.editTaskForm.value;
    const formatDate = (date: Date) => format(date, 'dd/MM/yyyy');

    const updateData: UpdateTaskDTO = {
      id: this.data.task.id,
      name: this.editTaskForm.value.name,
      startDate: formatDate(this.editTaskForm.value.startDate),
      endDate: formatDate(this.editTaskForm.value.endDate),
      projectId: +formValue.projectId,
      status: this.editTaskForm.value.status as StatusTask,
      collaborators: formValue.collaborators,
    };

    this.dialogRef.close(updateData);
  }
}
