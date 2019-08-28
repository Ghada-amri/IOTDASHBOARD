import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { AirqualityComponent } from './airquality/airquality.component';
import { EchartsLinComponent } from './airquality/echarts-lin.component';
import { ChartModule } from 'angular2-chartjs';
import { NgxEchartsModule } from 'ngx-echarts';
import { ChartsRoutingModule } from './charts/charts-routing.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { EchartsPiComponent } from './airquality/echarts-pi.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SmartTab1Component } from './airquality/smart-table/smart-tab1.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { SmartTable2Component } from './temperature/smart-table2/smart-table2.component';
import { TemperaturechildComponent } from './temperature/temperaturechild/temperaturechild.component';
import { TemperaturechildDraggerComponent } from './temperature/temperaturechild/temperaturechild-dragger/temperaturechild-dragger.component';
import { EclairageComponent } from './eclairage/eclairage.component';
import { HomeRoomsComponent } from './eclairage/homerooms/homerooms.component';
import { HomeRoomSelectorComponent } from './eclairage/homerooms/homeroom-selector/homeroom-selector.component';
import { MusicComponent } from './music/music.component';
import { MusicPlayerComponent } from './music/musicplayer/musicplayer.component';
import { TempChartjsLineComponent } from './temperature/tempchartjs-line.component';
import { LoginComponent } from './authentification/login/login.component';
import { RegisterComponent } from './authentification/register/register.component';
import { LogoutComponent } from './authentification/logout/logout.component';
const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    NgxChartsModule,
    NgxEchartsModule, 
    Ng2SmartTableModule,
    //NgxChartsModule, 
    ChartModule
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    AirqualityComponent,
    EchartsLinComponent,
    EchartsPiComponent,
    SmartTab1Component,
    TemperatureComponent,
    SmartTable2Component,
    TemperaturechildComponent,
    TemperaturechildDraggerComponent,
    EclairageComponent,
    HomeRoomsComponent,
    HomeRoomSelectorComponent,
    MusicComponent,
    MusicPlayerComponent,
    TempChartjsLineComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent
  ],
})
export class PagesModule {
}
