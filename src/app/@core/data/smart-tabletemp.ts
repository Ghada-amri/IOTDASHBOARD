import { Observable } from 'rxjs';

export interface SmartTableTempInterface {
  date: any;
  temperature: any;
  humidity: any;
}

export abstract class SmartTableTempData {
  abstract getData(): any;
  abstract getTempechartData() :Observable<SmartTableTempInterface>;
}
