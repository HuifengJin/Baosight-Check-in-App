import { Component, OnInit } from '@angular/core';
import { CalendarComponentOptions, DayConfig } from 'ion2-calendar';
import {Router, NavigationExtras, ActivatedRoute} from '@angular/router';
import { EI } from '../../shared/iplat4c/ei';
import { InquireDetailService } from './inquire-detail.service';

@Component({
  selector: 'app-inquire-detail',
  templateUrl: './inquire-detail.page.html',
  styleUrls: ['./inquire-detail.page.scss'],
})
export class InquireDetailPage implements OnInit {

  public InfoArray: any;
  public businessDay: any[];
  public holidayDay: any[];
  public dayR: DayConfig[] = [];

  dateRange: { from: string; to: string; };
  type: 'string';
  public MonthArrayD: string[] = ['一月', '二月', '三月', '四月', '五月', '六月',
                              '七月', '八月', '九月', '十月', '十一月', '十二月'];

                              optionsRangeD: CalendarComponentOptions = {
                                pickMode: 'range',
                                monthPickerFormat: this.MonthArrayD,
                                monthFormat: 'YYYY 年 MM 月 ',
                                weekdays: ['日', '一', '二', '三', '四', '五', '六'],
                                daysConfig: this.dayR
                              };

  public condition: any = {
    ENAME: '',
    CNAME: '',
    MONTH: '',
    HOLIDAY: 0,
    BUSINESS: 0
  };

  constructor(public router: Router, public activeRoute: ActivatedRoute, public IDSvc: InquireDetailService) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(res => {
      console.log('route param:', res);
      this.InfoArray = res;
      console.log('infoarray', this.InfoArray);
      this.condition.ENAME = this.InfoArray.ENAME;
      this.condition.CNAME = this.InfoArray.CNAME;
      this.condition.MONTH = this.InfoArray.MONTH;
      this.condition.HOLIDAY = this.InfoArray.HOLIDAY;
      this.condition.BUSINESS = this.InfoArray.BUSINESS;
      this.businessDay = this.InfoArray.businessDay;
      this.holidayDay = this.InfoArray.holidayDay;
      console.log(this.condition);
    });

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

  goBack() {
    this.router.navigate(['/inquire']);
  }

}
