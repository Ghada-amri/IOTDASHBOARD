import { Temperature } from './../data/temperature-humidity';
import { Injectable } from '@angular/core';
import { SmartTableTempData } from '../data/smart-tabletemp';

@Injectable()
export class SmartTableTempService extends SmartTableTempData {

  data = [{
    date: '2',
    temperature: 30,
    humidity: 45,
  },
  {
    date: '2',
    temperature: 30,
    humidity: 45,
  },
  {
     date: '1',
    temperature: 30,
    humidity: 45,
  },
  ];

  getData() {
    return this.data;
  }
}
