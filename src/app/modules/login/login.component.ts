import { CookieService } from 'ngx-cookie-service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../../shared/snackbar/services/snackbar.service';
import { AuthService } from '../../services/authentication/auth.service';
import { loginRequestDTO } from '../../DTO/users/loginRequestDTO';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


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

  // Formulário de login
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
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
        error: (err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.snackbar.openSnackBar('E-mail ou senha incorretos!', 'error');
          } else {
            this.snackbar.openSnackBar('Erro ao realizar login!', 'error');
          }
        }
      });
    }
  }
}
