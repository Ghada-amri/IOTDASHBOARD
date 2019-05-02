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
      date: {
        title: 'Date',
        type: 'string',
      },
      smoke: {
        title: 'fumée',
        type: 'number',
      },
      gaztoxique: {
        title: 'gaz toxique',
        type: 'number',
      },
      heure: {
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
