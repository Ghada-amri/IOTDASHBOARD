import { LoginComponent } from './authentification/login/login.component';
import { RegisterComponent } from './authentification/register/register.component';
import { LogoutComponent } from './authentification/logout/logout.component';

import { RouterModule, Routes } from '@angular/router';
import { NgModule, Component } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { AirqualityComponent } from './airquality/airquality.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { EclairageComponent } from './eclairage/eclairage.component';
import { MusicComponent } from './music/music.component';


const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'login-root',
    component: LoginComponent,
  },
  {
  path: 'register-root',
  component: RegisterComponent,
  },
  {
  path: 'logout-root',
  component: LogoutComponent,
  },
  {
      path: 'temp-hum',
      component: TemperatureComponent,
  },
  {
    path: 'air-quality',
    component: AirqualityComponent,
  },
  {
    path: 'iot-dashboard',
    component: DashboardComponent,
  },
  {
    path: 'music-dashboard',
    component: MusicComponent,
  },
  {
    path: 'eclairage-dashboard',
    component: EclairageComponent,
  },
  {
    path: 'ui-features',
    loadChildren: './ui-features/ui-features.module#UiFeaturesModule',
  }, {
    path: 'modal-overlays',
    loadChildren: './modal-overlays/modal-overlays.module#ModalOverlaysModule',
  }, {
    path: 'extra-components',
    loadChildren: './extra-components/extra-components.module#ExtraComponentsModule',
  }, {
    path: 'bootstrap',
    loadChildren: './bootstrap/bootstrap.module#BootstrapModule',
  }, {
    path: 'maps',
    loadChildren: './maps/maps.module#MapsModule',
  }, {
    path: 'charts',
    loadChildren: './charts/charts.module#ChartsModule',
  }, {
    path: 'editors',
    loadChildren: './editors/editors.module#EditorsModule',
  }, {
    path: 'forms',
    loadChildren: './forms/forms.module#FormsModule',
  }, {
    path: 'tables',
    loadChildren: './tables/tables.module#TablesModule',
  }, {
    path: 'miscellaneous',
    loadChildren: './miscellaneous/miscellaneous.module#MiscellaneousModule',
  }, {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '**',
    component: NotFoundComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
