import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private isCartOpenSubject = new BehaviorSubject<boolean>(false);
  isCartOpen$ = this.isCartOpenSubject.asObservable();

  constructor() {}

  openCart(): void {
    this.isCartOpenSubject.next(true);
  }

  closeCart(): void {
    this.isCartOpenSubject.next(false);
  }

  toggleCart(): void {
    const newState = !this.isCartOpenSubject.value;
    this.isCartOpenSubject.next(newState);
  }
}


