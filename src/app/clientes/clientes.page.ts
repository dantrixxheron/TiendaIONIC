import { Component } from '@angular/core';

@Component({
  selector: 'app-clientes',
  templateUrl: 'clientes.page.html',
  styleUrls: ['clientes.page.scss'],
})
export class ClientesPage {
  storeName: string = 'Gestión de Clientes';
  imageUrl: string = 'assets/default-avatar.png';
  cancelarBtn = false;
  id: number = 0;
  clientes: Cliente[] = [];
  nombreCliente: string = '';
  domicilio: string = '';
  telefono: string = '';
  correoElectronico: string = '';
  urlImagen: string = '';
  editando: string = 'Agregar';

  constructor() {
    this.cargarClientes();
  }

  ngOnInit() {
    this.storeName = localStorage.getItem('storeName') || 'Gestión de Clientes';
    this.imageUrl = localStorage.getItem('imageUrl') || 'assets/default-avatar.png';
  }

  agregarCliente() {
    if (this.nombreCliente && this.domicilio && this.telefono && this.correoElectronico && this.urlImagen) {
      const nuevoCliente = new Cliente(
        Date.now(),  // Generación de ID único basado en milisegundos actuales
        this.nombreCliente,
        this.domicilio,
        this.telefono,
        this.correoElectronico,
        this.urlImagen
      );

      this.clientes.push(nuevoCliente);
      this.guardarClientes();

      this.nombreCliente = '';
      this.domicilio = '';
      this.telefono = '';
      this.correoElectronico = '';
      this.urlImagen = '';
      this.editando = 'Agregar';
    }
  }

  guardarClientes() {
    localStorage.setItem('clientes', JSON.stringify(this.clientes));
    this.cancelarBtn = false;
  }

  cargarClientes() {
    const clientesGuardados = localStorage.getItem('clientes');
    if (clientesGuardados) {
      this.clientes = JSON.parse(clientesGuardados);
    }
  }

  editarCliente(cliente: Cliente) {
    this.editando = 'Editar';
    this.nombreCliente = cliente.nombreCliente;
    this.domicilio = cliente.domicilio;
    this.telefono = cliente.telefono;
    this.correoElectronico = cliente.correoElectronico;
    this.urlImagen = cliente.urlImagen;
    this.clientes = this.clientes.filter(c => c !== cliente);
    this.cancelarBtn = true;
  }

  cancelar() {
    this.nombreCliente = '';
    this.domicilio = '';
    this.telefono = '';
    this.correoElectronico = '';
    this.urlImagen = '';
    this.editando = 'Agregar';
    this.cargarClientes();
    this.cancelarBtn = false;
  }

  eliminarCliente(cliente: Cliente) {
    const confirmacion = confirm('¿Estás seguro de eliminar al cliente?');
    if (confirmacion) {
      this.clientes = this.clientes.filter(c => c !== cliente);
      this.guardarClientes();
    }
  }
}

class Cliente {
  constructor(
    public id: number,
    public nombreCliente: string,
    public domicilio: string,
    public telefono: string,
    public correoElectronico: string,
    public urlImagen: string
  ) {}
}
