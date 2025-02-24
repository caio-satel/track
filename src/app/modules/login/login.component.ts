import { CookieService } from 'ngx-cookie-service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../../shared/snackbar/services/snackbar.service';
import { AuthService } from '../../services/authentication/auth.service';
import { AddUserDTO } from '../../DTO/users/addUserDTO';
import { loginRequestDTO } from '../../DTO/users/loginRequestDTO';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  snackbar: SnackbarService = inject(SnackbarService);
  authService: AuthService = inject(AuthService);
  CookieService: CookieService = inject(CookieService);
  router: Router = inject(Router);

  // Variavel para esconder/exibir o login/cadastro
  loginCard = true;

  // Formulário de login
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
    password: new FormControl('', [Validators.required])
  });

  // Formulário de cadastro
  registerForm = new FormGroup({
    name: new FormControl ('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  onSubmitLogin(): void {
    if (this.loginForm.invalid || !this.loginForm.value) {
      return this.snackbar.openSnackBar('Preencha todos os campos corretamente!', 'warning');
    } else {
      this.authService.login(this.loginForm.value as loginRequestDTO).subscribe({
        next: (response) => {
          if(response){
            this.CookieService.set('token', response?.token);
            this.snackbar.openSnackBar('Login realizado com sucesso!', 'success');
            this.router.navigate(['/dashboard']);
          }
        },
        error: (error) => {
          this.snackbar.openSnackBar(error.error.message, 'warning');
        }
      });
    }
  }

  onSubmitRegister(): void {
    if (this.registerForm.invalid || !this.registerForm.value) {
      return this.snackbar.openSnackBar('Preencha todos os campos corretamente!', 'warning');
    } else {
      this.authService.register(this.registerForm.value as AddUserDTO).subscribe({
        next: (response) => {
          if(response){
            this.snackbar.openSnackBar('Cadastro realizado com sucesso!', 'success');
            this.registerForm.reset();
            this.loginCard = true;
          }
        },
        error: (error) => {
          console.log(error);
          this.snackbar.openSnackBar(error.error.message, 'warning');
        }
      });
      this.registerForm.reset();
    }
  }
}
