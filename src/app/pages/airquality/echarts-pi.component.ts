import { GasEchartPiInterface } from './../../@core/data/echart-pi-gas-data';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { Echart_pi_gas_Data } from '../../@core/data/echart-pi-gas-data';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'ngx-echarts-pi',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsPiComponent implements  OnDestroy {
  options: any = {};
  themeSubscription: any;
  gasData: GasEchartPiInterface;
  gaztoxique : number;
  fumee : number;
  airfraiche: number ;

  constructor(private theme: NbThemeService,private gasService :Echart_pi_gas_Data) {
    forkJoin(
      this.gasService.getGasechartData(),
    )
      .subscribe(([gasData]: [GasEchartPiInterface]) => {
        this.gasData = gasData;
        this.gaztoxique = this.gasData.gaztoxique;
        this.fumee = this.gasData.fumee;
        this.airfraiche = this.gasData.airfraiche;
      });
      this.gasService.getData().subscribe(
        (response:any)=> {
          console.log('gas from flask', response.gasdata);
        this.gasData = response.gasdata[0];
        console.log('Temperature Data', this.gasData);
        this.gaztoxique = this.gasData.gaztoxique;
        this.fumee = this.gasData.fumee;
        this.airfraiche = this.gasData.airfraiche;

        console.log('gaz toxique', this.gasData.gaztoxique);
        console.log('fumee', this.gasData.fumee);
        console.log('airfraiche', this.gasData.airfraiche);






        console.log('gaz toxique', this.gasData.gaztoxique);
        console.log('gaz toxique heloooo');
        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
    
          const colors = config.variables;
          const echarts: any = config.variables.echarts;
    
          this.options = {
            backgroundColor: echarts.bg,
            color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)',
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data: ['fumée', 'Gaz toxique', 'air fraîche'],
              textStyle: {
                color: echarts.textColor,
              },
            },
            series: [
              {
                name: 'gaz détecté:',
                type: 'pie',
                radius: '80%',
                center: ['50%', '50%'],
                data: [
                  { value: this.gasData.fumee, name: 'fumée' },
                  { value: this.gasData.gaztoxique, name: 'Gaz toxique' },
                  { value: this.gasData.airfraiche, name: 'air fraîche' }
                ],
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: echarts.itemHoverShadowColor,
                  },
                },
                label: {
                  normal: {
                    textStyle: {
                      color: echarts.textColor,
                    },
                  },
                },
                labelLine: {
                  normal: {
                    lineStyle: {
                      color: echarts.axisLineColor,
                    },
                  },
                },
              },
            ],
          };
        });








      },(error:any)=>{
        console.log('error', error);
      })  
    /*
    this.gasService.getData().subscribe((data:any)=>{
     console.log('gas information from database :', data);
    
        let element = data.gasinfo;
      console.log('gas information from database :', data.fumee);
      console.log('gas information from database :', element[1]);
      console.log('gas information from database :', element[2]);
        this.airfraiche=element[0];
        this.fumee=element[1];
        this.gaztoxique = element[2];
        //AfterViewInit,
      })*/

    
  }
  
  
  /*ngAfterViewInit() {
   
    console.log('gaz toxique', this.gaztoxique);
    console.log('gaz toxique heloooo');
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['fumée', 'Gaz toxique', 'air fraîche'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        series: [
          {
            name: 'gaz détecté:',
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            data: [
              { value: this.fumee, name: 'fumée' },
              { value: this.gaztoxique, name: 'Gaz toxique' },
              { value: this.airfraiche, name: 'air fraîche' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: echarts.itemHoverShadowColor,
              },
            },
            label: {
              normal: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
            },
          },
        ],
      };
    });
  }*/

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
