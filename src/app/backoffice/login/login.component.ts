import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { FooterComponent } from "../../footer/footer.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  inicioForm: FormGroup;
  storedEmail: string = '';
  storedPassword: string = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.inicioForm = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(8)]]
    });

    // Obtener correo y contraseña reales desde AuthService
    this.storedEmail = this.authService.getStoredEmail();
    this.storedPassword = this.authService.getStoredPassword();
  }

  autenticar() {
    const { correo, contrasena } = this.inicioForm.value;

    if (this.authService.login(correo, contrasena)) {
      this.router.navigate(["/app/control-panel"]);
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  }
}

