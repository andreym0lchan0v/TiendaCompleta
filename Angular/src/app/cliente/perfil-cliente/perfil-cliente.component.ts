import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../services/auth/user-service.service';
import { TokenService } from '../../services/auth/token.service';
import { Router, RouterLink } from '@angular/router';
import { PopupService } from '../../services/utils/popup.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil-cliente',
  imports: [CommonModule,RouterLink],
  templateUrl: './perfil-cliente.component.html',
  styleUrl: './perfil-cliente.component.scss'
})
export class PerfilClienteComponent implements OnInit {
  userData: any = {};
  showBackendButton: boolean = false;

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private popupService: PopupService,
    private userService: UserServiceService
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.userData = {
      username: this.userService.getUsername(),
      role: this.userService.getRole(),
      firstName: this.userService.getFirstName(),
      lastName: this.userService.getLastName(),
      address: this.userService.getAddress()
    };

    // Verificar si el usuario está logueado y tiene el rol adecuado
    const userRole = this.userData.role;
    this.showBackendButton = userRole === 'ADMIN' || userRole === 'SELLER';
  }

  async logout() {
    const confirmLogout = await this.popupService.showConfirmation(
      "Cerrar Sesión",
      "¿Está seguro de que desea cerrar sesión?",
      "Sí, cerrar sesión",
      "No, permanecer en la sesión"
    );

    if (confirmLogout) {
      this.popupService.loader("Cerrando sesión...", "Por favor espera");

      this.tokenService.removeToken();
      this.userService.removeSession();

      setTimeout(() => {
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
        this.popupService.close();
      }, 750);
    } else {
      this.popupService.showMessage("Cancelado", "Tu sesión sigue activa", "info");
    }
  }
}

