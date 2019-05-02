import { Injectable } from '@angular/core';
import { of as observableOf,  Observable, from } from 'rxjs';
import { HttpClient , HttpResponse } from '@angular/common/http'; 
import {gascurve,Gascurvedata} from '../data/echarts-lin-gasdata';
@Injectable()
export class EchartsLinGasCurvService extends Gascurvedata{
  gazcurvefile: JSON;
  
  constructor(private httpClient: HttpClient) { 
    super();
  }
 
  private gascurvUrl = "http://127.0.0.1:5000/fumee_gaztoxique_airfraiche_per_date";
  ngOnInit() {
  }
  private gascurvelement: gascurve = {
    fumee: 11,
    gaztoxique: 12,
    airfraiche: 13,
    gasdate: "22/05/2019",
  };
getgasdatecurv(): Observable<gascurve> {
    this.httpClient.get(this.gascurvUrl).subscribe(data => {
      console.log('gaz toxique fumee et air fraiche par date :', data);
      this.gazcurvefile = data as JSON;
      console.log(this.gazcurvefile);})
      return observableOf(this.gascurvelement);
  }

getDatagascurv() {
   return this.httpClient.get(this.gascurvUrl);
}

}
