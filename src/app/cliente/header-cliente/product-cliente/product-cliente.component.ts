import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { FooterComponent } from "../../../footer/footer.component";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

@Component({
  selector: 'app-product-cliente',
  imports: [CommonModule, FooterComponent],
  templateUrl: './product-cliente.component.html',
  styleUrl: './product-cliente.component.scss'
})
export class ProductosClienteComponent {
  products: Product[] = JSON.parse(localStorage.getItem('products') || '[]');
  showProductModal: boolean = false;
  selectedProduct: Product | null = null;
  cart: Product[] = JSON.parse(localStorage.getItem('cart') || '[]'); // Cargar el carrito

  openProductModal(product: Product) {
    this.selectedProduct = product;
    this.showProductModal = true;
  }

  closeProductModal() {
    this.showProductModal = false;
    this.selectedProduct = null;
  }

  /** Agregar producto al carrito correctamente */
  addToCart(product: Product) {
    // Obtener el carrito actual de localStorage
    let cart: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');

    // Buscar si el producto ya está en el carrito
    const existingProduct = cart.find(p => p.id === product.id);

    if (existingProduct) {
      // Si existe, aumentar la cantidad
      existingProduct.quantity += 1;
    } else {
      // Si no existe, agregarlo con cantidad 1
      cart.push({ ...product, quantity: 1 });
    }

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Actualizar la variable `cart` en el componente para reflejar los cambios
    this.cart = [...cart];

    alert('Producto añadido al carrito');
    location.reload();
  }
}
