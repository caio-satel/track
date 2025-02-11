import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../../shared/snackbar/services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginCard = true;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
    password: new FormControl('', [Validators.required])
  });

  registerForm = new FormGroup({
    nome: new FormControl ('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private snackbar: SnackbarService) { }

  onSubmitLogin(): void {
    if (this.loginForm.invalid || !this.loginForm.value) {
      this.snackbar.openSnackBar('Preencha todos os campos corretamente!', 'warning');
    } else {
      console.log(this.loginForm.value);
      this.snackbar.openSnackBar('Login realizado com sucesso!', 'success');
      this.loginForm.reset();
    }
  }

  onSubmitRegister(): void {
    if (this.registerForm.invalid || !this.registerForm.value) {
      this.snackbar.openSnackBar('Preencha todos os campos corretamente!', 'warning');
    } else {
      console.log(this.loginForm.value);
      this.snackbar.openSnackBar('Cadastro realizado com sucesso!', 'success');
      this.registerForm.reset();
    }
  }

}
