import {Component, OnInit} from '@angular/core';
import {SidebarStatusService} from '../../services/status/sidebar-status.service';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {

  isActiveMenuHeader: boolean = true;

  constructor(
    private sidebarStatusService: SidebarStatusService,
    private authService: AuthService, // Importamos AuthService para cerrar sesión
    private router: Router // Importamos Router para redirigir
  ) {}

  ngOnInit(): void {
    this.sidebarStatusService.status$.subscribe(status => {
      this.isActiveMenuHeader = status;
    });
  }

  /** Método para cerrar sesión */
  logout() {
    const confirmLogout = window.confirm("¿Estás seguro de que quieres cerrar la sesión?");

    if (confirmLogout) {
      this.authService.logout(); // Elimina la sesión del usuario
      this.router.navigate(['']); // Redirige a la pantalla de localhost
    }
  }
}
