import { Observable } from 'rxjs';

export interface SmartTableGasInterface {
  gasdate: any;
  fumee: any;
  gaztoxique: any;
  airfraiche: any;
 
}

export abstract class SmartTableGasData {
  abstract getData(): any;
  abstract getGasechartData() :Observable<SmartTableGasInterface>;
}
