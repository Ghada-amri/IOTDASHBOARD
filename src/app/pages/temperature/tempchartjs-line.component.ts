import { map } from 'rxjs/operators';
import { Component, OnDestroy } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import {TempchartjsLineService} from '../../@core/data/tempchartjs-line.service';
import { from } from 'rxjs';
@Component({
  selector: 'ngx-tempchartjs-line',
  template: `
    <chart type="line" [data]="data" [options]="options"></chart>
  `,
})
export class TempChartjsLineComponent implements OnDestroy {
  data: any;
  options: any;
  themeSubscription: any;
  labels = [];
  temp = [];
  hum = [];
  constructor(private theme: NbThemeService, private temperatureService: TempchartjsLineService) {
    console.log('we want to get TH fromDB');
    this.temperatureService.getData().subscribe((data:any)=>{
      console.log('temeprature humidity from database :', data);
      for (let i = 0; i < data.temphumcurv.length; i++)  {
        let element = data.temphumcurv[i];
        this.labels.push(this.convertDate(element[0]));
        this.temp.push(parseFloat(element[1]));
        this.hum.push(parseFloat(element[2]));
      }
      console.table(this.labels);
      console.log('------------- labels -----------', this.labels);
      console.table(this.temp);
      console.table(this.hum);
    },(error:any)=>{
      console.log('failed to get data');
    });
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      this.data = {
        labels: this.labels,
        datasets: [{
          data: this.temp,
          label: 'Température',
          backgroundColor: NbColorHelper.hexToRgbA(colors.danger, 0.3),
          borderColor: colors.danger,
        }, {
          data: this.hum,
          label: 'Humidité',
          backgroundColor: NbColorHelper.hexToRgbA(colors.info, 0.3),
          borderColor: colors.info,
        },
        ],
      };

      this.options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
        },
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
  convertDate(str) {
    var date = new Date(str),
        mnth = ("0" + (date.getMonth()+1)).slice(-2),
        day  = ("0" + date.getDate()).slice(-2);
    return [ date.getFullYear(), mnth, day ].join("-");
}
}
