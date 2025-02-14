import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  // BehaviorSubject para armazenar e emitir qual tema será usado, assim é possível 'escutar' as mudanças em outros componentes
  private isLightThemeSubject = new BehaviorSubject<boolean>(false);
  // Observable para os demais componentes se inscreverem e receberem a alteração
  isLightTheme$ = this.isLightThemeSubject.asObservable();

  constructor(
    // Renderer2 é usado para aplicar a classe CSS no DOM, evitando a manipulação do DOM diretamente
    rendererFactory: RendererFactory2,
    // Injetando DOCUMENT - Como a aplicação é SSR (Server Side Rendering) e rederiza no servidor antes de renderizar no navegador,
    // precisamos injetar o documento, pois ele não está disponível no servidor
    @Inject(DOCUMENT) private document: Document,
    // Para verificar se está no browser, e executar o código apenas quando estiver no navegador
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);

    if (isPlatformBrowser(this.platformId)) {
      this.isLightThemeSubject.next(localStorage.getItem('light-theme') === 'active');
      this.applyTheme();
    }
  }

  // Alterna o tema (light ou dark)
  toggleTheme() {
    const newTheme = !this.isLightThemeSubject.value;  // Inverte o tema
    this.isLightThemeSubject.next(newTheme);  // Atualiza o BehaviorSubject

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('light-theme', newTheme ? 'active' : 'inactive');
      this.applyTheme();
    }
  }

  // Aplica/Remove a classe CSS no DOM
  applyTheme() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.isLightThemeSubject.value) {
        this.renderer.addClass(this.document.body, 'light-theme');
      } else {
        this.renderer.removeClass(this.document.body, 'light-theme');
      }
    }
  }
}
