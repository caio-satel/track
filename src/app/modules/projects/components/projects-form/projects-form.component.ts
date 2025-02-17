import { Component, Inject, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { SnackbarService } from '../../../../shared/snackbar/services/snackbar.service';
import { UserDTO } from '../../../../DTO/users/userDTO';


@Component({
  selector: 'app-projects-form',
  templateUrl: './projects-form.component.html',
  styleUrl: './projects-form.component.css'
})
export class ProjectsFormComponent {
  private readonly destroy$: Subject<void> = new Subject();
  readonly dialogRef = inject(MatDialogRef<ProjectsFormComponent>);
  isClosing = false;
  // Armazenar os usuários para preencher a lista de usuários e preencher o campo de usuário responsável
  users: UserDTO[] = [];

  // Formulário para criação de novo projeto
  newProjectForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    userResponsibleId: new FormControl('', [Validators.required]),
    priority: new FormControl('', [Validators.required])
  });

  // Injeção de dependência
  constructor(private snackBar: SnackbarService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  // Função executada quando o componente é criado
  ngOnInit(): void {
    // Implementar a lógica
    // Buscar todos os usuários no banco de dados e armazená-los no array users

    // Se o projeto está editando um projeto, preencher o formulário com os dados do projeto recebidos no parâmetro data
    if (this.data && this.data.project) {
      this.newProjectForm.patchValue({
        name: this.data.project.name,
        startDate: this.data.project.startDate,
        endDate: this.data.project.endDate,
        userResponsibleId: this.data.project.userResponsibleId,
        priority: this.data.project.priority
      });
    }
  }

  addProject(): void {
    // Posteriormente implementar a lógica chamando o serviço de Projetos
    // Verificar se o dialog está fechando ou não, para evitar a mensagem do snackbar
    if (this.isClosing) {
      return;
    }

    const projectData = this.newProjectForm.value;
    // Se o formulário estiver inválido, exibe uma mensagem de erro
    // Se o projeto (data) não existir e o formulário estiver válido, criar um novo projeto
    // Se o projeto (data) existir e o formulário estiver válido, atualizar o projeto
    if (!this.newProjectForm.valid || !this.newProjectForm.value) {
      return this.snackBar.openSnackBar('Preencha todos os campos corretamente!', 'warning')

    } else if (!this.data && this.newProjectForm.valid && this.newProjectForm.value) {
      console.log(projectData); // Aqui chamaria um serviço de criação
      this.snackBar.openSnackBar('Cadastro realizado com sucesso!', 'success');
      this.newProjectForm.reset();
      this.dialogRef.close();
      
    } else {
      console.log('Editando projeto:', { ...this.data.project, ...projectData }); // Aqui chamaria um serviço de atualização
      this.snackBar.openSnackBar('Projeto atualizado com sucesso!', 'success');
      this.newProjectForm.reset();
      this.dialogRef.close();
    }
  }

  closeDialog(): void {
    this.isClosing = true; // Marca que o modal está sendo fechado
    this.dialogRef.close();
  }

  // Função ngOnDestroy
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
