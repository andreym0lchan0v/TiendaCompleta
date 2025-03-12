import { Component, OnInit } from '@angular/core';
import { ProductInterface } from '../../services/interfaces/product';
import { ProductService } from '../../services/auth/product.service';
import { UserServiceService } from '../../services/auth/user-service.service';
import { PopupService } from '../../services/utils/popup.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productos',
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss'
})
export class ProductosComponent implements OnInit {
  userProducts: ProductInterface[] = [];
  selectedFile: File | null = null;
  showModal = false;
  currentUser: string = ''; // Usuario autenticado

  newProduct: ProductInterface = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    tax: 0,
    currency: 'USD',
    image: '',
    sellerUsername: ''
  };

  constructor(
    private productService: ProductService,
    private userService: UserServiceService,
    private popupService: PopupService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.userService.getUsername() ?? ''; // ✅ Solución aplicada para evitar null
    this.loadUserProducts();
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.resetNewProduct(); // ✅ Resetea el formulario al cerrar el modal
  }

  loadUserProducts() {
    if (this.currentUser) {
      this.productService.getUserProducts(this.currentUser).subscribe({
        next: (products) => {
          this.userProducts = products;
        },
        error: () => {
          this.popupService.showMessage('Error', 'No se pudieron cargar los productos', 'error');
        }
      });
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  createProduct() {
    const productData = {
      name: this.newProduct.name,
      description: this.newProduct.description,
      price: this.newProduct.price,
      tax: this.newProduct.tax,
      currency: this.newProduct.currency,
      sellerUsername: this.currentUser // ✅ Agregado para asignar el usuario actual
    };

    this.productService.createProduct(productData).subscribe({
      next: (createdProduct) => {
        this.popupService.showMessage('Éxito', 'Producto creado correctamente', 'success');

        // ✅ Agregar el nuevo producto directamente a la lista sin recargar
        this.userProducts.push(createdProduct);
        this.closeModal();
      },
      error: (error) => {
        console.error("❌ Error al crear producto:", error);
        this.popupService.showMessage('Error', 'No se pudo crear el producto', 'error');
      }
    });
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.popupService.showMessage('Éxito', 'Producto eliminado correctamente', 'success');

        // ✅ Elimina el producto de la lista sin recargar la página
        this.userProducts = this.userProducts.filter(product => product.id !== id);
      },
      error: () => {
        this.popupService.showMessage('Error', 'No se pudo eliminar el producto', 'error');
      }
    });
  }

  resetNewProduct() {
    this.newProduct = {
      id: 0,
      name: '',
      description: '',
      price: 0,
      tax: 0,
      currency: 'USD',
      image: '',
      sellerUsername: this.currentUser // ✅ Mantiene el usuario actual
    };
  }
}
