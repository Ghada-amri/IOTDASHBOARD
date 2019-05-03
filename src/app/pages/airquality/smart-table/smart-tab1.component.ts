import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableGasData, SmartTableGasInterface } from '../../../@core/data/smart-tablegas';
import { SmartTableGasService } from '../../../@core/mock/smart-tablegas.service';

@Component({
  selector: 'ngx-smart-table1',
  templateUrl: './smart-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class SmartTab1Component {

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
      gasdate: {
        title: 'Date',
        type: 'string',
      },
      fumee: {
        title: 'fumée',
        type: 'number',
      },
      gaztoxique: {
        title: 'gaz toxique',
        type: 'number',
      },
      airfraiche: {
        title: 'air fraiche',
        type: 'string',
      },
    },
  };

  /*source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableGasData) {
    const data = this.service.getData();
    this.source.load(data);
  }*/

dataf : SmartTableGasInterface[] = [];
source: LocalDataSource = new LocalDataSource();
//dataf : [];
constructor(private gastableService: SmartTableGasService) {
  console.log('we want to get GFA fromDB');
  this.gastableService.getData().subscribe((data:any)=>{
    console.log('gaz toxique fumee et air fraiche :', data);
   
    for (let i = 0; i < data.gazcurv.length; i++)  {
      let element = data.gazcurv[i];
      this.dataf.push({
        gasdate: this.convertDate(element[0]),
        fumee: element[1],
        gaztoxique: element[2],
        airfraiche: element[3]
      });

    }
    console.log('------------- gas dataf -----------');
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
