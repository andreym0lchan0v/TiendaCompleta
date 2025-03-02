/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { CartComponent } from './app/cliente/header-cliente/cart/cart.component';
import {ArcElement, BarController, Chart, DoughnutController, Legend, PieController, Tooltip} from 'chart.js';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


// línea de configuración de gráficos
Chart.register(ArcElement, PieController, DoughnutController, Legend, Tooltip, BarController);
