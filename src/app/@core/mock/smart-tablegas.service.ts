import { Injectable } from '@angular/core';
import { SmartTableGasData } from '../data/smart-tablegas';

@Injectable()
export class SmartTableGasService extends SmartTableGasData {

  data = [{
    date: "1",
    heure: 'M njkhfgfark',
    smoke: 'Otto',
    gaztoxique: '@mdo',
  },
  {
    date: "gasssss",
    heure: 'Mark',
    smoke: 'Otto',
    gaztoxique: '@mdo',
  },
  {
    date: "3ggg",
    heure: 'Mark',
    smoke: 'Otto',
    gaztoxique: '@mdo',
  },
  {
    date: 4,
    heure: 'Mark',
    smoke: 'Otto',
    gaztoxique: '@mdo',
  },
  {
    date: 5,
    heure: 'Mark',
    smoke: 'Otto',
    gaztoxique: '@mdo',
  },
  ];
 
  getData() {
    return this.data;
  }
}
