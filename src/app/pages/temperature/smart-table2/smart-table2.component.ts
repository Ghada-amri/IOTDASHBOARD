import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableTempData } from '../../../@core/data/smart-tabletemp';
//import { TempHumcurvedata, temphumcurve } from '../../../@core/data/tempchartjs-line';
//import { forkJoin } from 'rxjs';

@Component({
  selector: 'ngx-smart-table2',
  templateUrl: './smart-table2.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class SmartTable2Component {
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      date: {
        title: 'Date',
        type: 'string',
      },
      temperature: {
        title: 'T°C',
        type: 'number',
      },
      humidity: {
        title: 'H%',
        type: 'number',
      },
    },
  };

   source: LocalDataSource = new LocalDataSource();
  
  constructor(private service: SmartTableTempData) {
    const data = this.service.getData();
    this.source.load(data);
  }
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  
}
