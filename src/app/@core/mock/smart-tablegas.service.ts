import { SmartTableGasData, SmartTableGasInterface } from '../data/smart-tablegas';
import { Injectable } from '@angular/core';
import { of as observableOf,  Observable, from } from 'rxjs';
import { HttpClient , HttpResponse } from '@angular/common/http'; 

@Injectable()
export class SmartTableGasService extends SmartTableGasData {

 gastabledata :JSON;
  private gasechartUrl = "http://127.0.0.1:5000/fumee_gaztoxique_airfraiche_per_date";

  constructor(private httpClient: HttpClient) { 
    super();
  }
  private data: SmartTableGasInterface = {
  gasdate: 11,
  fumee: 12,
  gaztoxique: 13,
  airfraiche: 14,
  };
  getGasechartData(): Observable<SmartTableGasInterface> {
    this.httpClient.get(this.gasechartUrl).subscribe(data => {
      this.gastabledata = data as JSON;
      console.log(this.gastabledata);})
      return observableOf(this.data);
  }

  getData() {
    return this.httpClient.get(this.gasechartUrl);
  }
}