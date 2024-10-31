import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menuprincipal',
  templateUrl: './menuprincipal.page.html',
  styleUrls: ['./menuprincipal.page.scss'],
})
export class MenuprincipalPage{
  storeName: string = '';
  imageUrl: string = '';
  constructor(private router: Router) {}

  ngOnInit() {
    // Obtener datos del nombre de la tienda y la URL de la imagen desde localStorage
    this.storeName = localStorage.getItem('storeName') || 'Nombre de la Tienda';
    this.imageUrl = localStorage.getItem('imageUrl') || 'assets/default-avatar.png';
  }

  // Navegar a la página de productos
  goToProductos() {
    this.router.navigate(['/home']);
  }

  // Navegar a la página de clientes
  goToClientes() {
    this.router.navigate(['/clientes']);
  }

  // Navegar a la página de ventas
  goToVentas() {
    this.router.navigate(['/ventas']);
  }

  // Navegar a la página de reportes
  goToReportes() {
    this.router.navigate(['/reportes']);
  }
}