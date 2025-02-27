import { CookieService } from 'ngx-cookie-service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../../services/theme-service/theme-service.service';
import { Subject, takeUntil } from 'rxjs';
import { UsersService } from '../../services/users/users.service';
import { User } from '../../models/users/user';
import { UserLoggedNameDTO } from '../../DTO/users/userLoggedNameDTO';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  private router: Router = inject(Router);
  private themeService: ThemeService = inject(ThemeService);
  private CookieService: CookieService = inject(CookieService);
  private usersServices: UsersService = inject(UsersService);

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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
