import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CredentialsService } from '../../services/auth/credentials.service';
import { UserInterface } from '../../services/interfaces/auth';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { PopupService } from '../../services/utils/popup.service';

@Component({
  selector: 'app-registro',
  imports: [
    ReactiveFormsModule, NgClass
  ],
  standalone: true,
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {
  showPassword: boolean = true;
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private credentialsService: CredentialsService,
    private router: Router,
    private popupService: PopupService
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
        ]
      ],
      roleName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  submit() {
    if (this.registerForm.invalid) {
      this.popupService.showMessage("Error", "Por favor, complete todos los campos correctamente", "error");
      return;
    }

    this.popupService.loader("Registrando usuario...");

    this.credentialsService.register(this.registerForm.value as UserInterface).subscribe({
      next: () => {
        setTimeout(() => {
          this.router.navigate(['/login']);
          this.popupService.close();
        this.popupService.showMessage("Éxito", "Usuario registrado correctamente", "success");
        }, 1200);
      },
      error: err => {
        this.popupService.close();
        console.log(err);
        this.popupService.showMessage("Error", "Hubo un problema al registrar el usuario", "error");
      }
    });
  }
}
