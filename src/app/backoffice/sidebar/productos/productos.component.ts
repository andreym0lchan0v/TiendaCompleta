import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../../../footer/footer.component";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

@Component({
  selector: 'app-productos',
  imports: [FormsModule, CommonModule, FooterComponent],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss'
})
export class ProductComponent {

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  products: Product[] = JSON.parse(localStorage.getItem('products') || '[]');
  filteredProducts: Product[] = [...this.products];
  newProduct: Product = { id: 0, name: '', description: '', price: 0, imageUrl: '' };
  showProductModal: boolean = false;
  isEditing: boolean = false;
  selectedProductId: number | null = null;

  searchTerm: string = '';
  minPrice: number = 0;
  maxPrice: number = 100;
  priceRangeMin: number = 0;
  priceRangeMax: number = 100;

  constructor() {
    this.setPriceLimits();
  }

  openAddProductModal() {
    this.isEditing = false;
    this.showProductModal = true;
    this.newProduct = { id: this.products.length + 1, name: '', description: '', price: 0, imageUrl: '' };
  }


  openEditProductModal(product: Product) {
    this.isEditing = true;
    this.selectedProductId = product.id;
    this.showProductModal = true;
    this.newProduct = { ...product };
  }

  closeProductModal() {
    this.showProductModal = false;
    this.selectedProductId = null;
  }

  saveProduct() {
    if (!this.newProduct.name || !this.newProduct.description || this.newProduct.price <= 0 || !this.newProduct.imageUrl) {
      alert('Por favor, complete todos los campos correctamente.');
      return;
    }

    if (this.isEditing) {
      const index = this.products.findIndex(p => p.id === this.selectedProductId);
      if (index !== -1) {
        this.products[index] = { ...this.newProduct };
      }
    } else {
      this.products.push({ ...this.newProduct });
    }

    localStorage.setItem('products', JSON.stringify(this.products));
    this.setPriceLimits();
    this.filterProducts();
    this.closeProductModal();
  }

  deleteProduct() {
    if (this.selectedProductId !== null && confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.products = this.products.filter(product => product.id !== this.selectedProductId);
      localStorage.setItem('products', JSON.stringify(this.products));
      this.setPriceLimits();
      this.filterProducts();
      this.closeProductModal();
    }
  }

  deleteAllProducts() {
    if (this.products.length > 0 && confirm('¿Estás seguro de que deseas eliminar todos los productos?')) {
      this.products = [];
      localStorage.removeItem('products');
      this.setPriceLimits();
      this.filterProducts();
    }
  }

  uploadImage(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newProduct.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  clearFileSelection() {
    this.fileInput.nativeElement.value = '';
  }

  // Función para filtrar productos con el slider
  filterProducts() {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      product.price >= this.minPrice && product.price <= this.maxPrice
    );
  }


  // Ajusta los límites del slider según los precios de los productos
  setPriceLimits() {
    if (this.products.length > 0) {
      const prices = this.products.map(p => p.price);
      this.priceRangeMin = Math.min(...prices);
      this.priceRangeMax = Math.max(...prices);
      this.minPrice = this.priceRangeMin;
      this.maxPrice = this.priceRangeMax;
    } else {
      this.priceRangeMin = 0;
      this.priceRangeMax = 100;
      this.minPrice = 0;
      this.maxPrice = 100;
    }
    this.filterProducts();
  }

  // Actualiza los valores del slider en tiempo real
  updatePriceRange() {
    if (this.minPrice > this.maxPrice) {
      let temp = this.minPrice;
      this.minPrice = this.maxPrice;
      this.maxPrice = temp;
    }
    this.filterProducts();
  }

  // Restablece todos los filtros
  resetFilters() {
    this.searchTerm = '';
    this.setPriceLimits();
  }

}
