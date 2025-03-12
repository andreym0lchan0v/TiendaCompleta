import { Component, OnInit } from '@angular/core';
import { CartComponent } from "../cart/cart.component";
import { ProductService } from '../../services/auth/product.service';
import { ProductInterface } from '../../services/interfaces/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tienda',
  imports: [CartComponent,CommonModule],
  standalone: true,
  templateUrl: './tienda.component.html',
  styleUrl: './tienda.component.scss'
})
export class TiendaComponent implements OnInit {
  products: ProductInterface[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: () => {
        console.error('Error al cargar los productos');
      }
    });
  }
}
