import { Component, Inject, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../../../../shared/snackbar/services/snackbar.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  Subject } from 'rxjs';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrl: './users-form.component.css'
})
export class UsersFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  readonly dialogRef = inject(MatDialogRef<UsersFormComponent>);
  isClosing = false;

  // Formulário para criação de novo usuário
  newUserForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    perfil: new FormControl('', [Validators.required])
  });

  // Injeção de dependência
  constructor(private snackbar: SnackbarService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  // Função executada quando o componente é criado
  ngOnInit(): void {
    // Implementar a lógica

    // Se o usuário está editando um usuário, preencher o formulário com os dados do usuário recebidos no parâmetro data
    if (this.data && this.data.user) {
      this.newUserForm.patchValue({
        name: this.data.user.name,
        email: this.data.user.email,
        perfil: this.data.user.perfil
      });
    }
  }

  addUser(): void {
    // Posteriormente implementar a lógica chamando o serviço de Usuarios
    // Verificar se o dialog está fechando ou não, para evitar a mensagem do snackbar
    if (this.isClosing) {
      return;
    }

    const userData = this.newUserForm.value;
    // Se o formulário estiver inválido, exibe uma mensagem de erro
    // Se o usuário (data) não existir e o formulário estiver válido, criar um novo usuário
    // Se o usuário (data) existir e o formulário estiver válido, atualizar o usuário
    if (!this.newUserForm.valid || !this.newUserForm.value) {
      return this.snackbar.openSnackBar('Preencha todos os campos corretamente!', 'warning');
    } else if (!this.data && this.newUserForm.valid && this.newUserForm.value) {
      console.log(userData); // Aqui chamaria um serviço de criação
      this.snackbar.openSnackBar('Cadastro realizado com sucesso!', 'success');
      this.newUserForm.reset();
      this.dialogRef.close();
    } else {
      console.log('Editando usuário:', { ...this.data.user, ...userData }); // Aqui chamaria um serviço de atualização
      this.snackbar.openSnackBar('Usuário atualizado com sucesso!', 'success');
      this.newUserForm.reset();
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
