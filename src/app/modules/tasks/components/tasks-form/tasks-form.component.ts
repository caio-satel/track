import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../../../../shared/snackbar/services/snackbar.service';
import { UserDTO } from '../../../../DTO/users/userDTO';
import { ProjectDTO } from '../../../../DTO/projects/projectDTO';

@Component({
  selector: 'app-tasks-form',
  templateUrl: './tasks-form.component.html',
  styleUrl: './tasks-form.component.css'
})
export class TasksFormComponent implements OnInit {
  snackbar: SnackbarService = inject(SnackbarService);
  readonly dialogRef = inject(MatDialogRef<TasksFormComponent>);
  isClosing = false;
  users: UserDTO[] = [];
  projects: ProjectDTO[] = [];

  newTaskForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    projectId: new FormControl('', [Validators.required]),
    userResponsibleId: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required])
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    // Implementar a lógica
    // Buscar todos os usuários no banco de dados e armazená-los no array users

    // Se o task está editando um task, preencher o formulário com os dados do task recebidos no parâmetro data
    if (this.data && this.data.task) {
      this.newTaskForm.patchValue({
        name: this.data.task.name,
        startDate: this.data.task.startDate,
        endDate: this.data.task.endDate,
        projectId: this.data.task.projectId,
        userResponsibleId: this.data.task.userResponsibleId,
        status: this.data.task.status
      });
    }
  }

  addTask(): void {
    // Posteriormente implementar a lógica chamando o serviço de tasks
    // Verificar se o dialog está fechando ou não, para evitar a mensagem do snackbar
    if (this.isClosing) {
      return;
    }

    const taskData = this.newTaskForm.value;
    // Se o formulário estiver inválido, exibe uma mensagem de erro
    // Se o task (data) não existir e o formulário estiver válido, criar uma nova task
    // Se o task (data) existir e o formulário estiver válido, atualizar a task
    if (!this.newTaskForm.valid || !this.newTaskForm.value) {
      return this.snackbar.openSnackBar('Preencha todos os campos corretamente!', 'warning')

    } else if (!this.data && this.newTaskForm.valid && this.newTaskForm.value) {
      console.log(taskData); // Aqui chamaria um serviço de criação
      this.snackbar.openSnackBar('Atividade criada com sucesso!', 'success');
      this.newTaskForm.reset();
      this.dialogRef.close();

    } else {
      console.log('Editando task:', { ...this.data.task, ...taskData }); // Aqui chamaria um serviço de atualização
      this.snackbar.openSnackBar('Atividade atualizada com sucesso!', 'success');
      this.newTaskForm.reset();
      this.dialogRef.close();
    }
  }

  closeDialog(): void {
    this.isClosing = true; // Marca que o modal está sendo fechado
    this.dialogRef.close();
  }
}
