import { CookieService } from 'ngx-cookie-service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../../services/theme-service/theme-service.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent implements OnInit, OnDestroy {
  private CookieService: CookieService = inject(CookieService);
  private destroy$ = new Subject<void>();
  isLightTheme: boolean = false; // Armazenar o estado do tema

  constructor(private router: Router, private themeService: ThemeService) {
    this.subscribeTheme();
  }
  ngOnInit(): void {
    this.subscribeTheme();
  }

  // Se inscrever no Observable do ThemeService, será notificado sempre que o tema mudar
  subscribeTheme():void {
    this.themeService.isLightTheme$
          .pipe(takeUntil(this.destroy$))  // A inscrição será descartada quando destroy$ emitir
          .subscribe(theme => {
            this.isLightTheme = theme;  // Atualiza o valor de isLightTheme
          });
  }

  // Função para sair do sistema, posteriormente implementar o delete do token/cookie, para garantir a saida do sistema
  logout(): void {
    this.CookieService.delete('token');
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
