import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../../../../shared/snackbar/services/snackbar.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { merge, Subject, takeUntil } from 'rxjs';

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
  constructor(private snackbar: SnackbarService) { }

  // Função executada quando o componente é criado
  ngOnInit(): void {
    // Implementar a lógica
  }

  addUser(): void {
    // Posteriormente implementar a lógica chamando o serviço de Usuarios
    // Verificar se o dialog está fechando ou não, para evitar a mensagem do snackbar
    if (this.isClosing) {
      return;
    }
    // Validar o formulário
    if (!this.newUserForm.valid || !this.newUserForm.value) {
      this.snackbar.openSnackBar('Preencha todos os campos corretamente!', 'warning');
      return;
    } else {
      console.log(this.newUserForm.value);
      this.snackbar.openSnackBar('Cadastro realizado com sucesso!', 'success');
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
