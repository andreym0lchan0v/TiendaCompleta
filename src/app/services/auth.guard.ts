import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.isUserAuthenticated()) {
      this.router.navigate(['/login']); // Redirigir al login si no está autenticado
      return false;
    }
    return true;
  }
  logout(): void {
    localStorage.removeItem('isAuthenticated'); // Elimina la sesión
    this.router.navigate(['/app/login']); // Redirige al login de Backoffice
  }
}
