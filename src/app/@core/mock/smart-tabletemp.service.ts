import { SmartTableTempInterface } from './../data/smart-tabletemp';
import { Temperature } from './../data/temperature-humidity';
import { Injectable } from '@angular/core';
import { SmartTableTempData } from '../data/smart-tabletemp';
import { of as observableOf,  Observable, from } from 'rxjs';
import { HttpClient , HttpResponse } from '@angular/common/http'; 

@Injectable()
export class SmartTableTempService extends SmartTableTempData {
  temptabledata :JSON;
  private tempechartUrl = "http://127.0.0.1:5000/temperature_humidity_per_date_tab";
  ngOnInit() {
  }
  constructor(private httpClient: HttpClient) { 
    super();
  }
  
  private data: SmartTableTempInterface = {
    date: 2,
    temperature: 30,
    humidity: 45,
  };
  
  getTempechartData(): Observable<SmartTableTempInterface> {
    this.httpClient.get(this.tempechartUrl).subscribe(data => {
      this.temptabledata = data as JSON;
      console.log(this.temptabledata);})
      return observableOf(this.data);
  }
  getData() {
    return this.httpClient.get(this.tempechartUrl);
  }
  
}
