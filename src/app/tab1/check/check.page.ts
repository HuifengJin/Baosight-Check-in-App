import { Component, OnInit } from '@angular/core';

import { CalendarComponentOptions } from 'ion2-calendar';

import { ModalController, AlertController } from '@ionic/angular';
import { CheckService } from './check.service';
import { EI } from '../../shared/iplat4c/ei';
import { DatePipe } from '@angular/common';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import {
  CalendarModal,
  CalendarModalOptions,
  DayConfig,
  CalendarResult
} from 'ion2-calendar';
import {Router, NavigationExtras, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-check',
  templateUrl: './check.page.html',
  styleUrls: ['./check.page.scss'],
})
export class CheckPage implements OnInit {

  public time = this.datePipe.transform(new Date(), 'yyyyMM');
  public businessDay: any[];
  public holidayDay: any[];
  public dayR: DayConfig[] = [];

  dateRange: {
    from: '',
    to: ''
  };
  type: 'string';

  public MonthArray: string[] = ['一月', '二月', '三月', '四月', '五月', '六月',
                              '七月', '八月', '九月', '十月', '十一月', '十二月'];

                              optionsRange: CalendarComponentOptions = {
                                pickMode: 'range',
                                monthPickerFormat: this.MonthArray,
                                monthFormat: 'YYYY 年 MM 月 ',
                                weekdays: ['日', '一', '二', '三', '四', '五', '六'],
                                daysConfig: this.dayR
                              };

  public condition = {
    ENAME: this.$localStorage.retrieve('userInfo')[0].ENAME,
    MONTH: new Date(),
    START_DATE: '',
    END_DATE: '',
    ATTENDANCE_TYPE: '',
    STATUS: ''
  };

  constructor(public modalCtrl: ModalController, public CHSvc: CheckService, public alertController: AlertController
    , private $localStorage: LocalStorageService, private $sessionStorage: SessionStorageService
    , private datePipe: DatePipe, public router: Router, public activeRoute: ActivatedRoute) {

}


  ngOnInit() {
    const result = this.activeRoute.snapshot.data.data;
    console.log(result);
    this.businessDay = result.getTable('Table0').Data[0]['BUSINESS_LIST'];
    this.holidayDay = result.getTable('Table0').Data[0]['HOLIDAY_LIST'];
    if (this.businessDay !== undefined) {
      for (const business of this.businessDay) {
        const start = business.slice(0, 8);
        const end = business.slice(9, 17);
        const days = +end - +start;
        for (let i = 0; i <= days; i++) {
          const dayString = (+start + i).toString();
          this.dayR.push({
            date: new Date(dayString.slice(0, 4) + '-' + dayString.slice(4, 6) + '-' + dayString.slice(6, 8)),
            marked: true,
            subTitle: '出差',
            cssClass: 'orange'
          });
        }
      }
    }
      if (this.holidayDay !== undefined) {
      for (const holiday of this.holidayDay) {
        const start = holiday.slice(0, 8);
        const end = holiday.slice(9, 17);
        const days = +end - +start;
        for (let i = 0; i <= days; i++) {
          const dayString = (+start + i).toString();
          this.dayR.push({
            date: new Date(dayString.slice(0, 4) + '-' + dayString.slice(4, 6) + '-' + dayString.slice(6, 8)),
            marked: true,
            subTitle: '休假',
            cssClass: 'orange'
          });
        }
      }
    }
    }


  async excuse() {
    const alert = await this.alertController.create({
      header: '休假原因',
      inputs: [
        {
          name: '年假',
          type: 'radio',
          label: '年假',
          value: '年假',
          checked: false
        }, {
          name: '病假',
          type: 'radio',
          label: '病假',
          value: '病假',
          checked: false
        }, {
          name: '事假',
          type: 'radio',
          label: '事假',
          value: '事假',
          checked: false
        }],
        buttons: [
          {
            text: '取消',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }, {
            text: '确认',
            handler: (res) => {
              console.log('Confirm Ok');
              console.log(res);
              this.condition.ATTENDANCE_TYPE = res;
              console.log(this.condition.ATTENDANCE_TYPE);
              // this.time = this.datePipe.transform(this.condition.MONTH, 'yyyyMM');
              console.log(this.time);
              this.CHSvc.insertHoliday(this.condition, this.time).subscribe(
                (outBlk: EI.JsonEIInfo) => {
                  if (outBlk.SysInfo.Flag === 0) {
                    console.log('insert holiday successfully');
                    console.log(outBlk);
                  }
                  console.log('insertHoliday', outBlk);
              },
              err => {
                console.log(err);
              }
              );
            }
          }
        ]
    });

    await alert.present();
  }


   holiday() {
    this.excuse();
    }


  businessTrip() {
    this.condition.ATTENDANCE_TYPE = '出差';
    console.log(this.time);
    // this.time = this.datePipe.transform(this.condition.MONTH, 'yyyyMM');
     this.CHSvc.insertBusinessTrip(this.condition, this.time).subscribe(
      (outBlk: EI.JsonEIInfo) => {
        if (outBlk.SysInfo.Flag === 0) {
          console.log('insert businesstrip successfully');
          console.log(outBlk);
        }
        console.log('insertBusinessTrip', outBlk);
    },
    err => {
      console.log(err);
    }
    );
  }

  monthChange(event) {
    this.time = event['newMonth'].string.slice(0, 4) + event['newMonth'].string.slice(5, 7);
    console.log(this.time);
    /* console.log('monthChange event called');
    console.log(event);
    this.time = event['newMonth'].string.slice(0, 4) + event['newMonth'].string.slice(5, 7);
    console.log(this.time);
    this.CHSvc.getAttendance(this.condition, this.time).subscribe(
      (outBlk: EI.JsonEIInfo) => {
        if (outBlk.SysInfo.Flag === 0) {
          console.log('get attendance successfully');
          console.log(outBlk);
          if (outBlk.getTable('Table0').Data[0] !== undefined) {
          this.businessDay = outBlk.getTable('Table0').Data[0]['BUSINESS_LIST'];
          this.holidayDay = outBlk.getTable('Table0').Data[0]['HOLIDAY_LIST'];
          console.log(this.businessDay);
          console.log(this.holidayDay);
          }
        }
        console.log('getAttendance', outBlk);
    },
    err => {
      console.log(err);
    }
    ); */
  }

  selectStart(event) {
    console.log('selectStart event called');
    console.log(event);
    console.log(this.time);
    if (+event['title'] < 10) {
      this.condition.START_DATE = this.time + '0' + event['title'];
    } else {
      this.condition.START_DATE = this.time + event['title'];
    }
    console.log(this.condition.START_DATE);
  }

  selectEnd(event) {
    console.log('selectEnd event called');
    console.log(event);
    if (+event['title'] < 10) {
      this.condition.END_DATE = this.time + '0' + event['title'];
    } else {
      this.condition.END_DATE = this.time + event['title'];
    }
    console.log(this.condition.END_DATE);
  }
}

