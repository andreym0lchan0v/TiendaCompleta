import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { FooterComponent } from "../../../../footer/footer.component";

@Component({
  selector: 'app-profile',
  imports: [FormsModule, NgClass, FooterComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  // Datos originales
  name: string = 'Juan Pérez';
  role: string = 'Desarrollador Full Stack';
  email: string = 'andrey@gmail.com'; // Se obtiene de localStorage
  phone: string = '+123 456 7890';
  location: string = 'Ciudad, País';
  birthdate: string = '1990-01-10';

  // Variables editables
  editedName: string = this.name;
  editedRole: string = this.role;
  editedEmail: string = this.email;
  editedPhone: string = this.phone;
  editedLocation: string = this.location;
  editedBirthdate: string = this.birthdate;

  // Imagen de perfil
  profileImage: string = '/profile.jpg';

  ngOnInit() {
    this.loadProfileData();
  }

  saveChanges() {
    if (
      this.name !== this.editedName ||
      this.role !== this.editedRole ||
      this.email !== this.editedEmail ||
      this.phone !== this.editedPhone ||
      this.location !== this.editedLocation ||
      this.birthdate !== this.editedBirthdate
    ) {
      // Guardar cambios en las variables originales
      this.name = this.editedName;
      this.role = this.editedRole;
      this.email = this.editedEmail;
      this.phone = this.editedPhone;
      this.location = this.editedLocation;
      this.birthdate = this.editedBirthdate;

      // Guardar datos en localStorage
      localStorage.setItem('profileData', JSON.stringify({
        name: this.name,
        role: this.role,
        email: this.email,
        phone: this.phone,
        location: this.location,
        birthdate: this.birthdate
      }));

      alert('Perfil actualizado correctamente');
    }
  }

  loadProfileData() {
    let savedData = localStorage.getItem('profileData');
    let savedImage = localStorage.getItem('profileImage');

    if (savedData) {
      let profile = JSON.parse(savedData);
      this.name = profile.name;
      this.role = profile.role;
      this.email = profile.email;
      this.phone = profile.phone;
      this.location = profile.location;
      this.birthdate = profile.birthdate;

      // Cargar en los campos editables
      this.editedName = this.name;
      this.editedRole = this.role;
      this.editedEmail = this.email;
      this.editedPhone = this.phone;
      this.editedLocation = this.location;
      this.editedBirthdate = this.birthdate;
    }

    if (savedImage) {
      this.profileImage = savedImage;
    }
  }

  // Activar el input de archivos
  triggerFileInput() {
    let fileInput = document.getElementById('file-input') as HTMLInputElement;
    fileInput.click();
  }

  // Manejar la subida de la imagen
  uploadImage(event: Event) {
    let input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      let file = input.files[0];
      let reader = new FileReader();

      reader.onload = () => {
        this.profileImage = reader.result as string;
        localStorage.setItem('profileImage', this.profileImage);
        alert('Imagen actualizada correctamente');
      };

      reader.readAsDataURL(file);
    }
  }
}
