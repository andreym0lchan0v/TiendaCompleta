import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule,  } from '@angular/forms';
import { FooterComponent } from "../../../footer/footer.component";


@Component({
  selector: 'app-password',
  imports: [FormsModule, NgClass, FooterComponent],
  standalone:true,
  templateUrl: './password.component.html',
  styleUrl: './password.component.scss'
})
export class PasswordComponent implements OnInit {
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  passwordCriteria: string = 'La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, un número y un carácter especial.';
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;

  ngOnInit() {
    // Cargar la contraseña almacenada al iniciar el componente
    this.currentPassword = localStorage.getItem('storedPassword') || 'M1P@ssword';
  }

  isValidPassword(password: string): boolean {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  }

  changePassword() {
    if (!this.newPassword || !this.confirmPassword) {
      alert('Por favor, rellene todos los campos');
      return;
    }
    if (this.newPassword !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    if (this.newPassword === this.currentPassword) {
      alert('La nueva contraseña no puede ser igual a la actual');
      return;
    }
    if (!this.isValidPassword(this.newPassword)) {
      alert('La contraseña no cumple con los requisitos mínimos');
      return;
    }

    // Guarda la nueva contraseña en localStorage y actualiza la vista
    localStorage.setItem('storedPassword', this.newPassword);
    this.currentPassword = this.newPassword;

    alert('Contraseña actualizada correctamente');

    // Limpia los campos y los mensajes de error
    this.newPassword = '';
    this.confirmPassword = '';
  }
}
