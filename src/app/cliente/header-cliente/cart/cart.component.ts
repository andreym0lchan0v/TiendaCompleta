import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart/cart.service';
import { FooterComponent } from "../../../footer/footer.component";

interface CartItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number; // Cantidad del mismo producto
}

@Component({
  selector: 'app-cart',
  imports: [CommonModule, FooterComponent],
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cart: CartItem[] = [];
  total: number = 0;
  isCartVisible = false;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.loadCart();
    this.cartService.isCartOpen$.subscribe(visible => {
      this.isCartVisible = visible;
    });
  }

  loadCart() {
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
  }

  increaseQuantity(index: number) {
    this.cart[index].quantity += 1;
    this.updateCart();
  }

  decreaseQuantity(index: number) {
    if (this.cart[index].quantity > 1) {
      this.cart[index].quantity -= 1;
    } else {
      this.removeFromCart(index);
    }
    this.updateCart();
  }

  removeFromCart(index: number) {
    const confirmDelete = confirm("¿Estás seguro de que quieres eliminar este producto del carrito?");

    if (confirmDelete) {
      this.cart.splice(index, 1);
      this.updateCart();
    }
  }


  clearCart() {
    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      this.cart = [];
      localStorage.removeItem('cart');
      this.total = 0;
    }
  }

  updateCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.calculateTotal();
  }

  closeCart() {
    this.cartService.closeCart();
  }
}



