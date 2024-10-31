import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  newUsername: string = '';
  newPassword: string = '';
  storeName: string = '';
  imageUrl: string = '';

  constructor(private router: Router) {}

  // Función de registro
  registro() {
    if (this.newUsername && this.newPassword && this.storeName && this.imageUrl) {
      // Aquí puedes guardar el nuevo usuario en una base de datos o sistema de autenticación real
      // Por ahora lo guardamos en localStorage como ejemplo
      localStorage.setItem('registeredUsername', this.newUsername);
      localStorage.setItem('registeredPassword', this.newPassword);
      localStorage.setItem('storeName', this.storeName);
      localStorage.setItem('imageUrl', this.imageUrl);
      alert('Usuario registrado exitosamente.');
      
      // Redirigir al login después de registrarse
      this.router.navigate(['/login']);
    } else {
      alert('Por favor, ingresa un nombre de usuario y contraseña.');
    }
  }

  // Redirigir a la página de login
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
