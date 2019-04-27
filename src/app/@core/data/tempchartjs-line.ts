import { Observable } from 'rxjs';

export interface temphumcurve {
  tempvalue: number;
  humvalue: number;
  date: string;
}

export abstract class TempHumcurvedata {
  abstract gettemphumdatecurv(): Observable<temphumcurve>;
  abstract getDatacurv(): any;
}
