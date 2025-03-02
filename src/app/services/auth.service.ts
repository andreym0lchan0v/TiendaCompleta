import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  constructor(private router: Router) {
    this.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  }

  /** Obtener correo almacenado en localStorage */
  getStoredEmail(): string {
    return JSON.parse(localStorage.getItem('profileData') || '{}').email || 'andrey@gmail.com';
  }

  /** Obtener contraseña almacenada en localStorage */
  getStoredPassword(): string {
    return localStorage.getItem('storedPassword') || 'M1P@ssword';
  }

  /** Iniciar sesión validando correo y contraseña actualizados */
  login(email: string, password: string): boolean {
    const storedEmail = this.getStoredEmail();
    const storedPassword = this.getStoredPassword();

    if (email === storedEmail && password === storedPassword) {
      this.isAuthenticated = true;
      localStorage.setItem('isAuthenticated', 'true');
      return true;
    }
    return false;
  }

  /** Cerrar sesión y redirigir al login */
  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('isAuthenticated');
    this.router.navigate(['/app/login']); // Redirigir al login
  }

  /** Verificar si el usuario está autenticado */
  isUserAuthenticated(): boolean {
    return this.isAuthenticated;
  }
}
