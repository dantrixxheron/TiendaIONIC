import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;
  showPassword: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.autocompleteLogin();
  }

  // Función de login
  login() {
    if (this.username && this.password) {
      if (this.rememberMe) {
        // Almacenar en localStorage si se selecciona "Recordar contraseña"
        localStorage.setItem('username', this.username);
        localStorage.setItem('password', this.password);
      } else {
        // Limpiar localStorage si el usuario no selecciona "Recordar contraseña"
        localStorage.removeItem('username');
        localStorage.removeItem('password');
      }
      // Redirige al usuario a otra página después de iniciar sesión (ejemplo: página principal)
      this.router.navigate(['/menuprincipal']);
    } else {
      alert('Por favor, ingresa usuario y contraseña.');
    }
  }

  // Redirigir a la página de registro
  goToRegister() {
    this.router.navigate(['/registro']); // Redirigir a la página de registro
  }

  // Función para autocompletar los datos de login si están almacenados
  autocompleteLogin() {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (storedUsername && storedPassword) {
      this.username = storedUsername;
      this.password = storedPassword;
      this.rememberMe = true;
    }
  }

  // Mostrar/ocultar contraseña
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
