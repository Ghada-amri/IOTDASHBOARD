import { Injectable } from '@angular/core';
import { of as observableOf,  Observable, from } from 'rxjs';
import { TemperatureHumidityData, Temperature } from '../data/temperature-humidity';
import { HttpClient , HttpResponse } from '@angular/common/http'; 
 
@Injectable()
export class TemperatureHumidityService extends TemperatureHumidityData{
  temperature: JSON;
  humidity: JSON;

  constructor(private httpClient: HttpClient) { 
    super();
  }
  private temperatureUrl = "http://127.0.0.1:5000/temperature";
  private humidityUrl = "http://127.0.0.1:5000/humidity";
  ngOnInit() {
  }
  getTemperatureData(): Observable<Temperature> {
    this.httpClient.get(this.temperatureUrl).subscribe(data => {
      this.temperature = data as JSON;
      console.log(this.temperature);})
      return observableOf(this.temperatureDate);
    }
   getHumidityData(): Observable<Temperature> {
      this.httpClient.get(this.humidityUrl).subscribe(data => {
        this.humidity = data as JSON;
        console.log(this.humidity);})
        return observableOf(this.humidityDate);
      }  
  private temperatureDate: Temperature = {
    value: 13,
    min: 0,
    max: 100,
  };

  private humidityDate: Temperature = {
    value: 60,
    min: 0,
    max: 100,
  };
  
    getDatatemp() {
      return this.httpClient.get(this.temperatureUrl);
      
    }
    getDatahum() {
      return this.httpClient.get(this.humidityUrl);
      
    }

    /*getHumidityData(): Observable<Temperature> {
      return observableOf(this.humidityDate);
    }*/

    

}
