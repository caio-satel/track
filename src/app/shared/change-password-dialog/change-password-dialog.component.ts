import { ChangePasswordDTO } from './../../DTO/users/ChangePasswordDTO';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../snackbar/services/snackbar.service';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrl: './change-password-dialog.component.css'
})
export class ChangePasswordDialogComponent {
  changePasswordForm = new FormGroup({
    currentPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmNewPassword: new FormControl('', [Validators.required])
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ChangePasswordDTO,
    private dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    private snackbar: SnackbarService,
  ) { }

  onSubmit(): void {
    if (!this.changePasswordForm.valid) {
      return this.snackbar.openSnackBar('Preencha todos os campos corretamente!', 'warning');
    }

    const currentPassword = this.changePasswordForm.value.currentPassword;
    const newPassword = this.changePasswordForm.value.newPassword;
    const confirmNewPassword = this.changePasswordForm.value.confirmNewPassword;

    if (currentPassword == newPassword) {
      return this.snackbar.openSnackBar('A nova senha deve ser diferente da atual!', 'warning');
    } else if (newPassword != confirmNewPassword) {
      return this.snackbar.openSnackBar('As senhas não coincidem!', 'warning');
    } else if (newPassword.length < 6) {
      return this.snackbar.openSnackBar('A senha deve conter pelo menos 6 caracteres!', 'warning');
    }

    this.dialogRef.close({
      currentPassword: this.changePasswordForm.value.currentPassword,
      newPassword: this.changePasswordForm.value.newPassword
    });
  }
}
