import { Observable } from 'rxjs';

export interface GasEchartPiInterface {
  gaztoxique : number;
  fumee : number;
  airfraiche: number ;
}

export abstract class Echart_pi_gas_Data {
  abstract getGasechartData(): Observable<GasEchartPiInterface>;
  abstract getData(): any;
  
}