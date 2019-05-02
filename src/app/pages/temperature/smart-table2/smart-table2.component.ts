import { SmartTableTempInterface } from './../../../@core/data/smart-tabletemp';
import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/data/smart-table';
import { SmartTableTempData } from '../../../@core/data/smart-tabletemp';
import { SmartTableTempService } from '../../../@core/mock/smart-tabletemp.service';
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

  /* source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableTempData) {
    const data = this.service.getData();
    this.source.load(data);
  }*/
  
dataf : SmartTableTempInterface[] = [];
source: LocalDataSource = new LocalDataSource();
//dataf : [];
constructor(private temperatureService: SmartTableTempService) {
  console.log('we want to get TH fromDB');
  this.temperatureService.getData().subscribe((data:any)=>{
    console.log('temeprature humidity from database :', data);
   
    for (let i = 0; i < data.temphumcurv.length; i++)  {
      let element = data.temphumcurv[i];
     //this.dataf[i].date.push(this.convertDate(element[0]));
     //this.dataf[i].date=this.source.add(this.convertDate(element[0]));
     //this.dataf[i].temperature=this.source.add(element[1]);
     //this.dataf[i].humidity=this.source.add(element[2]);
     // this.dataf[i].temperature.push(element[1]);
     // this.dataf[i].humidity.push(parseFloat(element[2]));
      this.dataf.push(element);
     //this.source.add(this.dataf[i]);
    }
    console.log('------------- dataf -----------');
    console.table(this.dataf);
    this.source.load(this.dataf);
    
  },(error:any)=>{
    console.log('failed to get data');
  });
}
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  convertDate(str) {
    var date = new Date(str),
        mnth = ("0" + (date.getMonth()+1)).slice(-2),
        day  = ("0" + date.getDate()).slice(-2);
    return String([ date.getFullYear(), mnth, day ].join("-"));
}
  }