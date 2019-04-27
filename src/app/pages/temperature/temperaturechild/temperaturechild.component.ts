import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { Temperature, TemperatureHumidityData } from '../../../@core/data/temperature-humidity';
import { takeWhile } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'ngx-temperaturechild',
  styleUrls: ['./temperaturechild.component.scss'],
  templateUrl: './temperaturechild.component.html',
})
export class TemperaturechildComponent implements OnDestroy {

  private alive = true;

  temperatureData: Temperature;
  temperature: number;
  temperatureOff = false;
  temperatureMode = 'cool';

  humidityData: Temperature;
  humidity: number;
  humidityOff = false;
  humidityMode = 'heat';

  colors: any;
  themeSubscription: any;

  constructor(private theme: NbThemeService,
              private temperatureHumidityService: TemperatureHumidityData) {
    this.theme.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(config => {
      this.colors = config.variables;
    });

    forkJoin(
      this.temperatureHumidityService.getTemperatureData(),
      this.temperatureHumidityService.getHumidityData(),
    )
      .subscribe(([temperatureData, humidityData]: [Temperature, Temperature]) => {
        this.temperatureData = temperatureData;
        this.temperature = this.temperatureData.value;

        this.humidityData = humidityData;
        this.humidity = this.humidityData.value;
      });

      /*this.temperatureHumidityService.getData().subscribe(
        (response:any)=> {
          console.log('Temperature from flask', response.temperature);
        this.temperatureData = response.temperature[0];
        console.log('Temperature Data', this.temperatureData);
        this.temperature = this.temperatureData.value;
        console.log('Temperature Data value', this.temperatureData.value);
      },(error:any)=>{
        console.log('Temperature error from flask', error);
      })*/
      


      this.temperatureHumidityService.getDatatemp().subscribe(
        (response:any)=> {
          console.log('Temperature from flask', response.temperature);
        this.temperatureData = response.temperature[0];
        console.log('Temperature Data', this.temperatureData);
        this.temperature = this.temperatureData.value;
        console.log('Temperature Data value', this.temperatureData.value); 
      },(error:any)=>{
        console.log('humidity error from flask', error);
      })


      this.temperatureHumidityService.getDatahum().subscribe(
        (response:any)=> {
          console.log('humidity from flask', response.humidity);
        this.humidityData = response.humidity[0];
        console.log('humidity Data', this.humidityData);
        this.humidity = this.humidityData.value;
        console.log('humidity Data value', this.humidityData.value);
      },(error:any)=>{
        console.log('humidity error from flask', error);
      })
      

  }

  ngOnDestroy() {
    this.alive = false;
  }
}
