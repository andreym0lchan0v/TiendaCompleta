import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserServiceService } from '../../services/auth/user-service.service';
import { TokenService } from '../../services/auth/token.service';

@Component({
  selector: 'app-header-cliente',
  imports: [RouterLink,CommonModule],
  standalone: true,
  templateUrl: './header-cliente.component.html',
  styleUrl: './header-cliente.component.scss'
})
export class HeaderClienteComponent implements OnInit {

  isLoggedIn: boolean = false;
  username: string | null = null;

  constructor(
    private tokenService: TokenService,
    private userService: UserServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.updateLoginStatus();
  }

  updateLoginStatus() {
    const token = this.tokenService.getAccessToken();
    this.isLoggedIn = !!token;

    if (this.isLoggedIn) {
      this.username = this.userService.getUsername();
    } else {
      this.username = null;
    }
  }
  listenToSessionChanges() {
    this.router.events.subscribe(() => {
      this.updateLoginStatus();
    });
  }
}

