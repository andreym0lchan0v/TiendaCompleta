import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CredentialsService} from '../../services/auth/credentials.service';
import {LoginInterface} from '../../services/interfaces/auth';
import {TokenService} from '../../services/auth/token.service';
import { RegistroComponent } from '../registro/registro.component';
import {Router, RouterLink} from '@angular/router';
import { NgClass } from '@angular/common';
import { UserServiceService } from '../../services/auth/user-service.service';
import { PopupService } from '../../services/utils/popup.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,RouterLink,NgClass
  ],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  showPassword: boolean = false;

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private credentialsService: CredentialsService,
    private tokenService: TokenService,
    private router: Router,
    private userServiceService: UserServiceService,
    private popupService: PopupService,
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }




  submit() {
    if (this.loginForm.invalid) {
      this.popupService.showMessage("Error", "Todos los campos son obligatorios", "warning");
      return;
    }
    this.credentialsService.login(this.loginForm.value as LoginInterface).subscribe({
      next: (data) => {

    this.popupService.loader("Iniciando sesión...", "Por favor espera");

    setTimeout(() => {
      this.tokenService.saveTokens(data.token, "234325423423");
      this.userServiceService.save(data.username, data.role,data.firstName, data.lastName, data.address);
      this.popupService.close();
      this.popupService.showMessage("Bienvenido", `Hola ${data.firstName},${data.lastName} !`, "success");
      this.router.navigate(['/app/control-panel']);
    }, 1200)

      },
      error: (err) => {
        this.popupService.close();
        this.popupService.showMessage("Error", "Credenciales incorrectas, intenta nuevamente.", "error");
        this.loginForm.reset();
      }
    });
  }
}
