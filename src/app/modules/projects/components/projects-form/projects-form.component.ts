import { Component, Inject} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../../../../shared/snackbar/services/snackbar.service';
import { ProjectDTO } from '../../../../DTO/projects/projectDTO';
import { Priority } from '../../../../models/enum/priority.enum';
import { UsersService } from '../../../../services/users/users.service';
import { UserDTO } from '../../../../DTO/users/userDTO';
import { StatusProject } from '../../../../models/enum/statusProject.enum';
import { format } from 'date-fns';

@Component({
  selector: 'app-projects-form',
  templateUrl: './projects-form.component.html',
  styleUrl: './projects-form.component.css'
})
export class ProjectsFormComponent {
  newProjectForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    startDate: new FormControl(null, [Validators.required]),
    endDate: new FormControl(null, [Validators.required]),
    responsibleUser: new FormControl('', [Validators.required]),
    priority: new FormControl('', [Validators.required])
  });

  editProjectForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    startDate: new FormControl(null, [Validators.required]),
    endDate: new FormControl(null, [Validators.required]),
    responsibleUser: new FormControl('', [Validators.required]),
    priority: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required])
  });

  users: UserDTO[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: SnackbarService,
    private userService: UsersService,
    readonly dialogRef: MatDialogRef<ProjectsFormComponent>
  ) { }

  ngOnInit(): void {
    this.listUsers();

    if (this.data?.project) {
      const startDate = this.convertToDate(this.data.project.startDate);
      const endDate = this.convertToDate(this.data.project.endDate);

      this.editProjectForm.patchValue({
        name: this.data.project.name,
        startDate: startDate,
        endDate: endDate,
        responsibleUser: this.data.project.responsibleUser.id,
        priority: this.data.project.priority,
        status: this.data.project.status
      });
    }
  }

  listUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: () => this.snackbar.openSnackBar('Erro ao buscar usuários!', 'error')
    });
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

  addProject(): void {
    if (!this.newProjectForm.valid) {
      return this.snackbar.openSnackBar('Preencha todos os campos corretamente!', 'warning');
    }

    const formValue = this.newProjectForm.value;
    const formatDate = (date: Date) => format(date, 'dd/MM/yyyy');

    const payload = {
      name: formValue.name,
      startDate: formatDate(formValue.startDate),
      endDate: formatDate(formValue.endDate),
      responsibleUser: formValue.responsibleUser,
      priority: formValue.priority
    };

    this.dialogRef.close(payload);
  }

  editProject(): void {
    if (!this.data?.project?.id) {
      return this.snackbar.openSnackBar('Projeto não encontrado!', 'warning');
    }
    if (!this.editProjectForm.valid || !this.editProjectForm.value) {
      return this.snackbar.openSnackBar('Preencha todos os campos corretamente!', 'warning');
    }

    const formValue = this.editProjectForm.value;

    const startDateFormatted = this.formatDateToDDMMYYYY(formValue.startDate);
    const endDateFormatted = this.formatDateToDDMMYYYY(formValue.endDate);

    const updateData: ProjectDTO = {
      id: this.data.project.id,
      name: this.editProjectForm.value.name,
      startDate: startDateFormatted,
      endDate: endDateFormatted,
      responsibleUser: +this.editProjectForm.value.responsibleUser,
      priority: this.editProjectForm.value.priority as Priority,
      status: this.editProjectForm.value.status as StatusProject
    };
    
    this.dialogRef.close(updateData);
  }
}
