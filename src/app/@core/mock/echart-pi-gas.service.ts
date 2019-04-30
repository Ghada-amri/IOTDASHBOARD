import { Injectable } from '@angular/core';
import { of as observableOf,  Observable, from } from 'rxjs';
import { Echart_pi_gas_Data, GasEchartPiInterface } from '../data/echart-pi-gas-data';
import { HttpClient , HttpResponse } from '@angular/common/http'; 
 
@Injectable()
export class EchartPiGasService extends Echart_pi_gas_Data{
  gasechartdata :JSON;
  
  constructor(private httpClient: HttpClient) { 
    super();
  }
  private gasechartUrl = "http://127.0.0.1:5000/gasdata";
  ngOnInit() {
  }
 

  private gasinfo: GasEchartPiInterface = {
    gaztoxique : 50,
    fumee : 50,
    airfraiche: 50 ,
  };
  getGasechartData(): Observable<GasEchartPiInterface> {
    this.httpClient.get(this.gasechartUrl).subscribe(data => {
      this.gasechartdata = data as JSON;
      console.log(this.gasechartdata);})
      return observableOf(this.gasinfo);
  }
  getData() {
    return this.httpClient.get(this.gasechartUrl);
  }
}
