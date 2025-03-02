import { Routes } from '@angular/router';

import { LayoutComponent } from './cliente/layout/layout.component';
import { LayoutBackComponent } from './backoffice/layout/layout.component';

import { HomeComponent } from './cliente/home/home.component';
import { LoginComponent } from './backoffice/login/login.component';
import { RegistroComponent } from './cliente/registro/registro.component';
import { TiendaComponent } from './cliente/tienda/tienda.component';
import { ControlPanelComponent } from './backoffice/control-panel/control-panel.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './backoffice/tabs/tab-menu/profile/profile.component';
import { PasswordComponent } from './backoffice/sidebar/password/password.component';
import { ProductComponent } from './backoffice/sidebar/productos/productos.component';
import { ProductosClienteComponent } from './cliente/header-cliente/product-cliente/product-cliente.component';
import { AuthGuard } from './services/auth.guard';
import { FooterComponent } from './footer/footer.component';
import { CartComponent } from './cliente/header-cliente/cart/cart.component';


export const routes: Routes = [
  // **Sección Cliente**
  {
    path: "", component: LayoutComponent, children: [
      { path: "", component: HomeComponent }, // Página principal
      { path: "login", component: LoginComponent }, // Login del Cliente
      { path: "registro", component: RegistroComponent }, // Registro de Usuario
      { path: "tienda", component: TiendaComponent }, // Tienda de productos
      { path: "productos-cliente", component: ProductosClienteComponent } // Productos para client
    ]
  },

  // **Sección Backoffice Protegida**
  {
    path: "app", component: LayoutBackComponent, children: [
      { path: "", redirectTo: "control-panel", pathMatch: "full"}, // Redirige al panel de control después del login
      { path: "login", component: LoginComponent }, // Login del Backoffice (no protegido)
      { path: "control-panel", component: ControlPanelComponent, canActivate: [AuthGuard] }, // Panel de Control Protegido
      { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] }, // Perfil Protegido
      { path: "password", component: PasswordComponent, canActivate: [AuthGuard] }, // Cambio de Contraseña Protegido
      { path: "productos", component: ProductComponent, canActivate: [AuthGuard] } // Productos Protegidos
    ]
  },

  // **Página 404 si no existe la ruta**
  { path: "**", component: PageNotFoundComponent },
];


// andrey@gmail.com
// M1P@ssword
