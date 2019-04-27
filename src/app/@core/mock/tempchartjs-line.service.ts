import { Injectable } from '@angular/core';
import { of as observableOf,  Observable, from } from 'rxjs';
import { HttpClient , HttpResponse } from '@angular/common/http'; 
import {TempHumcurvedata,temphumcurve} from '../data/tempchartjs-line';

@Injectable()
export class TempchartjsLineService extends TempHumcurvedata{
  temphumcurve: JSON;
  
  constructor(private httpClient: HttpClient) { 
    super();
  }

  private dateUrl = "http://127.0.0.1:5000/date";
  ngOnInit() {
  }
  private temphumdateData: temphumcurve = {
    tempvalue: 30,
    humvalue: 30,
    date: " ",
  };
  gettemphumdatecurv(): Observable<temphumcurve> {
    this.httpClient.get(this.dateUrl).subscribe(data => {
      this.temphumcurve = data as JSON;
      console.log(this.temphumcurve);})
      return observableOf(this.temphumdateData);
    }
 
  getDatacurv() {
    return this.httpClient.get(this.dateUrl);
    
  }
}
