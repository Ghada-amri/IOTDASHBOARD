import { Injectable } from '@angular/core';
import { of as observableOf,  Observable, from } from 'rxjs';
import { HttpClient , HttpResponse } from '@angular/common/http'; 
import {TempHumcurvedata,temphumcurve} from './tempchartjs-line';

@Injectable()
export class TempchartjsLineService extends TempHumcurvedata{
  temphumcurve: JSON;
  
  constructor(private httpClient: HttpClient) { 
    super();
  }

  private dateUrl = "http://127.0.0.1:5000/temperature_humidity_per_date";
  ngOnInit() {
  }
  private temphumdateData: temphumcurve = {
    tempvalue: 30,
    humvalue: 30,
    date: " ",
  };
  gettemphumdatecurv(): Observable<temphumcurve> {
    this.httpClient.get(this.dateUrl).subscribe(data => {
      console.log('temperature humidity per date :', data);
      this.temphumcurve = data as JSON;
      console.log(this.temphumcurve);})
      return observableOf(this.temphumdateData);
    }
 getData() {
   return this.httpClient.get(this.dateUrl);
 }
  getDatacurv() {
    return this.httpClient.get(this.dateUrl);
    
  }
}
