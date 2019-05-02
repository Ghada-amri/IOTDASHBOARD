import { Observable } from 'rxjs';

export interface gascurve {
  fumee: number;
  gaztoxique: number;
  airfraiche: number;
  gasdate: string;
}

export abstract class Gascurvedata {
  abstract getgasdatecurv(): Observable<gascurve>;
  abstract getDatagascurv(): any;
}
