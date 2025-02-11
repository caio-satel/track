import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {

  constructor(private router: Router) { }

  // Função para sair do sistema, posteriormente implementar o delete do token/cookie, para garantir a saida do sistema
  logout(): void {
    console.log('Logout');
    this.router.navigate(['/']);
  }
}
