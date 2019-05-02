import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { EchartsLinGasCurvService } from '../../@core/mock/echarts-lin-gascurv.service';

@Component({
  selector: 'ngx-echarts-lin',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsLinComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;
  gaztoxiquedata =[];
  fumeedata =[];
  airfraichedata = [];
  gazdate =[];
  constructor(private theme: NbThemeService,  private gascurvService: EchartsLinGasCurvService) 
  {
    console.log('we want to get gas curv data fromDB');
    this.gascurvService.getDatagascurv().subscribe((data:any)=>{
      console.log('fumee gaz toxique et air fraiche :', data);
      for (let i = 0; i < data.gazcurv.length; i++)  {
        let element = data.gazcurv[i];
        this.fumeedata.push(parseFloat(element[1]));
        this.gaztoxiquedata.push(parseFloat(element[2]));
        this.airfraichedata.push(parseFloat(element[3]));
        this.gazdate.push(this.convertDate(element[0]));
      }
      console.log('------------- fumee -----------');
      console.table(this.fumeedata);
      console.log('------------- gaztoxique -----------');
      console.table(this.gaztoxiquedata);
      console.log('------------- air fraiche -----------');
      console.table(this.airfraichedata);
      console.log('------------- gaz date -----------');
      console.table(this.gazdate);
      
    },(error:any)=>{
      console.log('failed to get data');
    });

  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.danger, colors.primary, colors.info],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}',
        },
        legend: {
          left: 'left',
          data: ['fumée', 'Gaz toxique', 'air fraîche'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        xAxis: [
          {
            type: 'category',
            data:this.gazdate,
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'log',
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            splitLine: {
              lineStyle: {
                color: echarts.splitLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        series: [
          {
            name: 'fumée',
            type: 'line',
            data: this.fumeedata,
          },
          {
            name: 'Gaz toxique',
            type: 'line',
            data: this.gaztoxiquedata,
          },
          {
            name:'air fraîche',
            type: 'line',
            data: this.airfraichedata,
          }
        ],
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
