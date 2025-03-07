import {Component, OnInit} from '@angular/core';
import {SidebarStatusService} from '../../services/status/sidebar-status.service';
import { Router, RouterLink } from '@angular/router';
import { TokenService } from '../../services/auth/token.service';
import { UserServiceService } from '../../services/auth/user-service.service';
import { PopupService } from '../../services/utils/popup.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {

  isActiveMenuHeader: boolean = true;
  constructor(
    private sidebarStatusService: SidebarStatusService,
    private tokenService: TokenService,
    private router: Router,
    private userServiceService: UserServiceService,
    private popupService: PopupService
  )
  {}

  ngOnInit(): void {
    this.sidebarStatusService.status$.subscribe(status => {
      this.isActiveMenuHeader = status;
    });
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
      this.userServiceService.removeSession();
      setTimeout(() => {
        this.router.navigate(['/login']);
        this.popupService.close();
      }, 1500);

    } else {
      this.popupService.showMessage("Cancelado", "Tu sesión sigue activa", "info");
    }
  }
}
