import { CookieService } from 'ngx-cookie-service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../../services/theme-service/theme-service.service';
import { Subject, takeUntil } from 'rxjs';
import { UsersService } from '../../services/users/users.service';
import { User } from '../../models/users/user';
import { UserLoggedNameDTO } from '../../DTO/users/userLoggedNameDTO';
import { ChangePasswordDialogComponent } from '../change-password-dialog/change-password-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from '../snackbar/services/snackbar.service';
import { ChangePasswordDTO } from '../../DTO/users/ChangePasswordDTO';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  changePassword: ChangePasswordDTO = { currentPassword: '', newPassword: '' };

  constructor(
    private dialog: MatDialog,
    private snackbar: SnackbarService,
    private themeService: ThemeService,
    private CookieService: CookieService,
    private usersServices: UsersService,
    private router: Router
  ) { }

  userLogged: UserLoggedNameDTO = { name: '', role: '' };
  isLightTheme: boolean = false;

  ngOnInit(): void {
    this.subscribeTheme();
    this.getUserLogged();
  }

  subscribeTheme():void {
    this.themeService.isLightTheme$
          .pipe(takeUntil(this.destroy$))  // A inscrição será descartada quando destroy$ emitir
          .subscribe(theme => {
            this.isLightTheme = theme;  // Atualiza o valor de isLightTheme
          });
  }

  getUserLogged() {
    this.usersServices.getUserLogged().subscribe({
      next: (response) => {
        this.userLogged = response;
      },
      error: (err) => console.error('Erro ao buscar usuário logado:', err)
    });
  }

  logout(): void {
    this.CookieService.delete('token');
    this.router.navigate(['/']);
  }

  openChangePasswordDialog(changePasswordData: ChangePasswordDTO, enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        changePasswordData: changePasswordData
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usersServices.changePassword(result).subscribe({
          next: (response) => {
            this.snackbar.openSnackBar('Senha alterada com sucesso!', 'success');
          },
          error: (err: HttpErrorResponse) => {
            if (err.status === 400) {
              this.snackbar.openSnackBar('Senha atual incorreta!', 'error');
            } else {
              this.snackbar.openSnackBar('Erro ao alterar senha!', 'error');
            }
          }
      });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
