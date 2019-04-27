import { Injectable } from '@angular/core';
import { SmartTableData } from '../data/smart-table';

@Injectable()
export class SmartTableService extends SmartTableData {

  data = [{
    date: 1,
    heure: 'M njkhfgfark',
    smoke: 'Otto',
    gaztoxique: '@mdo',
  },
  {
    date: 2,
    heure: 'Mark',
    smoke: 'Otto',
    gaztoxique: '@mdo',
  },
  {
    date: 3,
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
