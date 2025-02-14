import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeServiceService {
  private renderer: Renderer2;
  private isLightTheme = false;

  constructor(
    // Renderer2 é usado para aplicar a classe CSS no DOM, evitando a manipulação do DOM diretamente
    rendererFactory: RendererFactory2,
    // Injetando DOCUMENT - Como a aplicação é SSR (Server Side Rendering) e rederiza no servidor antes de renderizar no navegador,
    // precisamos injetar o documento, pois ele não está disponível no servidor
    @Inject(DOCUMENT) private document: Document,
    // Para verificar se está no browser, e executar o código apenas quando estiver no navegador
    @Inject(PLATFORM_ID) private platformId: object
  ) {

    // Verifica se o tema salvo é light mode
    if (typeof window !== 'undefined') {
      this.isLightTheme = localStorage.getItem('light-theme') === 'active';
    }
    
    this.renderer = rendererFactory.createRenderer(null, null);

    if (isPlatformBrowser(this.platformId)) {
      this.isLightTheme = localStorage.getItem('light-theme') === 'active';
      this.applyTheme();
    }
  }

  // Alterna o tema (light ou dark)
  toggleTheme() {
    this.isLightTheme = !this.isLightTheme;

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('light-theme', this.isLightTheme ? 'active' : 'inactive');
      this.applyTheme();
    }
  }

  // Aplica a classe CSS no DOM
  private applyTheme() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.isLightTheme) {
        this.renderer.addClass(this.document.body, 'light-theme');
      } else {
        this.renderer.removeClass(this.document.body, 'light-theme');
      }
    }
  }
}
