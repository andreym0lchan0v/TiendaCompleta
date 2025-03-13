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
  selectedProduct: ProductInterface | null = null; // Para mostrar en el modal
  showModal: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        console.log("📦 Productos cargados:", products);
        this.products = products;
      },
      error: (error) => {
        console.error("❌ Error al cargar los productos", error);
      }
    });
  }


  openModal(product: ProductInterface) {
    this.selectedProduct = product;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedProduct = null;
  }
}
