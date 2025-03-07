import { Component } from '@angular/core';
import { CartComponent } from "../cart/cart.component";

@Component({
  selector: 'app-tienda',
  imports: [CartComponent],
  standalone: true,
  templateUrl: './tienda.component.html',
  styleUrl: './tienda.component.scss'
})
export class TiendaComponent {

}
