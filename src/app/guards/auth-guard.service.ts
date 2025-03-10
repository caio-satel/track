import { AuthService } from './../services/authentication/auth.service';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  private AuthService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.AuthService.isLoggedIn()) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
