import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../../services/auth/cart.service';

interface Product {
  name: string;
  quantity: number;
  price: number;
  currency: string;

}

interface ShippingInfo {
  fullName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  cart: Product[] = [];
  shippingInfo: ShippingInfo = {
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'US'
  };
  paymentMethod: string = 'credit-card';
  totalAmount: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
      this.calculateTotal();
    });
  }

  calculateTotal() {
    this.totalAmount = this.cart.reduce((total, product) => {
      const priceInUSD = product.currency === 'EUR' ? product.price * 1.10 : product.price;
      return total + priceInUSD * product.quantity;
    }, 0);
  }

  processCheckout() {
    if (!this.shippingInfo.fullName || !this.shippingInfo.email || !this.shippingInfo.address ||
        !this.shippingInfo.city || !this.shippingInfo.postalCode || !this.shippingInfo.country) {
      alert('Por favor, completa todos los campos de envío.');
      return;
    }

    const orderDetails = {
      shippingInfo: this.shippingInfo,
      paymentMethod: this.paymentMethod,
      cart: this.cart,
      totalAmount: this.totalAmount
    };

    console.log('Pedido confirmado:', orderDetails);
    alert('¡Pedido confirmado con éxito!');
  }
}
