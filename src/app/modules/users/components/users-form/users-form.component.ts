import { Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../../../../shared/snackbar/services/snackbar.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UpdateUserDTO } from '../../../../DTO/users/updateUserDTO';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrl: './users-form.component.css'
})
export class UsersFormComponent implements OnInit {
  newUserForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    role: new FormControl('', [Validators.required])
  });

  editUserForm = new FormGroup({
    role: new FormControl('', [Validators.required])
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: SnackbarService,
    readonly dialogRef: MatDialogRef<UsersFormComponent>
  ) { }

  ngOnInit(): void {
    if (this.data?.user) {
      this.editUserForm.patchValue({
        role: this.data.user.role
      });
    }
  }

  addUser(): void {
    if (!this.newUserForm.valid) {
      return this.snackbar.openSnackBar('Preencha todos os campos corretamente!', 'warning');
    }

    this.dialogRef.close(this.newUserForm.value);
  }

  editUser(): void {
    if (!this.data?.user?.id) {
      return this.snackbar.openSnackBar('Usuário não encontrado no banco de dados!', 'warning');
    }

    if (!this.editUserForm.valid || !this.editUserForm.value) {
      return this.snackbar.openSnackBar('Preencha todos os campos corretamente!', 'warning');
    }

    const updateData: UpdateUserDTO = {
      id: this.data.user.id,
      role: this.editUserForm.value.role
    };

    this.dialogRef.close(updateData);
  }
}
