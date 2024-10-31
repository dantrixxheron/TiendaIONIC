import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  storeName: string = '';
  imageUrl: string = '';
  CancelarBtn=false;
  id:number=0;
  productos: Producto[] = [];
  nombre: string = '';
  descripcion: string = '';
  precioCosto: number = 0;
  precioVenta: number = 0;
  cantidad: number = 0;
  urlImagen: string = '';
  editando: string = 'Agregar';
  constructor() {
    this.cargarProductos();
  }
  ngOnInit() {
    // Obtener datos del nombre de la tienda y la URL de la imagen desde localStorage
    this.storeName = localStorage.getItem('storeName') || 'Nombre de la Tienda';
    this.imageUrl = localStorage.getItem('imageUrl') || 'assets/default-avatar.png';
  }
  Agregar() {
    if (this.nombre && this.descripcion && this.precioCosto && this.precioVenta && this.cantidad && this.urlImagen) {
      const nuevoProducto = new Producto(
        this.id=Date.now(),
        this.nombre,
        this.descripcion,
        this.precioCosto,
        this.precioVenta,
        this.cantidad,
        this.urlImagen
      );
      
      this.productos.push(nuevoProducto);
      
      // Guardar el array de productos actualizado en localStorage
      this.guardarProductos();

      // Limpiar los campos después de agregar el producto
      this.nombre = '';
      this.descripcion = '';
      this.precioCosto = 0;
      this.precioVenta = 0;
      this.cantidad = 0;
      this.urlImagen = '';
      this.editando="Agregar";
    }
  }

  // Guardar los productos en localStorage
  guardarProductos() {
    localStorage.setItem('productos', JSON.stringify(this.productos));
    this.CancelarBtn=false;
  }

  // Cargar los productos desde localStorage
  cargarProductos() {
    const productosGuardados = localStorage.getItem('productos');
    if (productosGuardados) {
      this.productos = JSON.parse(productosGuardados);
    }
  }
  editarProducto(producto: Producto) {
    this.editando = 'Editar';
    this.nombre = producto.nombre;
    this.descripcion = producto.descripcion;
    this.precioCosto = producto.precioCosto;
    this.precioVenta = producto.precioVenta;
    this.cantidad = producto.cantidad;
    this.urlImagen = producto.urlImagen;
    this.productos = this.productos.filter(p => p !== producto);
    this.CancelarBtn=true;
  }
  Cancelar(){
    this.nombre = '';
      this.descripcion = '';
      this.precioCosto = 0;
      this.precioVenta = 0;
      this.cantidad = 0;
      this.urlImagen = '';
      this.editando="Agregar";
      this.cargarProductos();
      this.CancelarBtn=false;
  }
  eliminarProducto(producto: Producto) {
    // Usar confirm() para confirmar antes de eliminar
    const confirmacion = confirm('¿Estás seguro de eliminar el producto?');
    if (confirmacion) {
      // Si se confirma, eliminar el producto
      this.productos = this.productos.filter(p => p !== producto);

      // Actualizar el localStorage después de la eliminación
      this.guardarProductos();
    }
  }
}

// Clase Producto
class Producto {
  constructor(
    public id:number,
    public nombre: string,
    public descripcion: string,
    public precioCosto: number,
    public precioVenta: number,
    public cantidad: number,
    public urlImagen: string
  ) {}
}
