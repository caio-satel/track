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
    private snackBar: SnackbarService,
    private userService: UsersService,
    readonly dialogRef: MatDialogRef<ProjectsFormComponent>
  ) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => {
        console.error('Erro ao carregar usuários:', error);
      }
    });

    if (this.data?.project) {
      const startDate = new Date(this.data.project.startDate);
      const endDate = new Date(this.data.project.endDate);

      const formatDate = (date: Date) => format(date, 'dd/MM/yyyy');

      this.editProjectForm.patchValue({
        name: this.data.project.name,
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        responsibleUser: this.data.project.responsibleUser.id,
        priority: this.data.project.priority,
        status: this.data.project.status
      });
    }
  }

  addProject(): void {
    if (!this.newProjectForm.valid) {
      return this.snackBar.openSnackBar('Preencha todos os campos corretamente!', 'warning');
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
      console.error('Projeto não encontrado!');
      return;
    }
    if (!this.editProjectForm.valid || !this.editProjectForm.value) {
      return this.snackBar.openSnackBar('Preencha todos os campos corretamente!', 'warning');
    }

    const formValue = this.editProjectForm.value;

    const updateData: ProjectDTO = {
      id: this.data.project.id,
      name: this.editProjectForm.value.name,
      startDate: formValue.startDate,
      endDate: formValue.endDate,
      responsibleUser: +this.editProjectForm.value.responsibleUser,
      priority: this.editProjectForm.value.priority as Priority,
      status: this.editProjectForm.value.status as StatusProject
    };
    this.dialogRef.close(updateData);
  }
}
