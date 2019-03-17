import { Injectable } from '@angular/core';
import { of as observableOf,  Observable, from } from 'rxjs';
import { TemperatureHumidityData, Temperature } from '../data/temperature-humidity';
import {Http} from "@angular/http";
@Injectable()
export class TemperatureHumidityService extends TemperatureHumidityData {

  private temperatureDate: Temperature = {
    value: 18,
    min: 12,
    max: 30,
  };

  private humidityDate: Temperature = {
    value: 87,
    min: 0,
    max: 100,
  };
  constructor(private http: Http) {
      super();
  }

  getTemperatureData(): Observable<Temperature> {
    return observableOf(this.temperatureDate);
    //this.http.get("url-to-firebase").subscribe();
  }

  getHumidityData(): Observable<Temperature> {
    return observableOf(this.humidityDate);
  }
}
