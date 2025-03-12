import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, throwError } from 'rxjs';
import { ProductInterface } from '../interfaces/product';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`; // Base URL

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  // 🔍 Obtener todos los productos
  getAllProducts(): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(this.apiUrl);
  }

  // 🔍 Obtener productos de un usuario en particular
  // 🔹 Obtener productos de un usuario
getUserProducts(username: string): Observable<ProductInterface[]> {
  const token = this.tokenService.getAccessToken();

  return this.http.get<ProductInterface[]>(`${this.apiUrl}/by-seller/${username}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  }).pipe(
    map(products =>
      products.map(product => ({
        ...product,
        sellerUsername: product.sellerUsername || 'Desconocido' // ✅ Asegura que nunca sea null
      }))
    )
  );
}



  // 🔍 Buscar productos por nombre
  searchProductsByName(name: string): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(`${this.apiUrl}/search?name=${name}`);
  }

  // 🆕 Crear un nuevo producto (Ahora incluye `sellerUsername`)
  createProduct(product: any): Observable<any> {
    const token = this.tokenService.getAccessToken();

    console.log("🚀 Enviando JSON al backend:", product);

    return this.http.post(`${this.apiUrl}/create`, product, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
  }


  // 🔄 Actualizar un producto existente
  updateProduct(id: number, product: any): Observable<any> {
    const token = this.tokenService.getAccessToken();

    return this.http.put(`${this.apiUrl}/update/${id}`, product, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    });
  }

  // ❌ Eliminar un producto
  deleteProduct(id: number): Observable<any> {
    const token = this.tokenService.getAccessToken();

    return this.http.delete(`${this.apiUrl}/delete/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    });
  }
}
