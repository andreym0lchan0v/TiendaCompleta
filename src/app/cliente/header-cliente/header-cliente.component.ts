import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { CartComponent } from "./cart/cart.component";

@Component({
  selector: 'app-header-cliente',
  imports: [RouterLink, CartComponent],
  standalone: true,
  templateUrl: './header-cliente.component.html',
  styleUrl: './header-cliente.component.scss'
})
export class HeaderClienteComponent {
  constructor(private cartService: CartService) {}

  openCart() {
    this.cartService.toggleCart();
  }
}
