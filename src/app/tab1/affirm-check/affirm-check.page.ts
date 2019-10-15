import { Component, OnInit } from '@angular/core';
import {Router, NavigationExtras, ActivatedRoute} from '@angular/router';
import { DatePipe } from '@angular/common';
import { AffirmCheckService } from './affirm-check.service';
import { EI } from '../../shared/iplat4c/ei';


@Component({
  selector: 'app-affirm-check',
  templateUrl: './affirm-check.page.html',
  styleUrls: ['./affirm-check.page.scss'],
})
export class AffirmCheckPage implements OnInit {

  public selectThisMonth: Date = new Date();
  public date = this.datePipe.transform(new Date(), 'yyyy-MM');
  public checkList;
  public month: any;
  public businessDay: any[];
  public holidayDay: any[];

  public condition: any = {
    ENAME: '',
    CNAME: '',
    MONTH: '',
    HOLIDAY: 0,
    BUSINESS: 0,
    STATUS: ''
  };


  constructor(public router: Router, public activeRoute: ActivatedRoute, private datePipe: DatePipe
    , public ACSvc: AffirmCheckService) {
    this.condition.MONTH = new Date();
    console.log(this.condition.MONTH);
  }

  ngOnInit() {}


  ionViewWillEnter() {
    console.log('ionViewWillEnter');
    this.month = this.datePipe.transform(this.condition.MONTH, 'yyyyMM');
    console.log(this.month);
    this.ACSvc.getAttendance(this.month).subscribe(
      (outBlk: EI.JsonEIInfo) => {
        if (outBlk.SysInfo.Flag === 0) {
          console.log('get attendance successfully');
          console.log(outBlk);
          this.checkList = outBlk.getTable('Table0').Data;
        }
        console.log('getAttendance', outBlk);
    },
    err => {
      console.log(err);
    }
    );
  }


  goDetail(item) {
    console.log(item);
    const routerParams: NavigationExtras  = {
      queryParams: {
          ENAME: item.ENAME,
          CNAME: item.CNAME,
          MONTH: item.MONTH,
          HOLIDAY: item.HOLIDAY,
          BUSINESS: item.BUSINESS,
          STATUS: item.STATUS,
          businessDay: item.BUSINESS_LIST,
          holidayDay: item.HOLIDAY_LIST
      }
  };
  console.log(routerParams);
    this.router.navigate(['/affirm-check/affirm-detail'], routerParams);
  }

  doSwipe(item) {
    item.STATUS = '1';
    console.log(item);
    this.ACSvc.updateAttendance(item).subscribe(
      (outBlk: EI.JsonEIInfo) => {
        if (outBlk.SysInfo.Flag === 0) {
          console.log('update attendance successfully');
          console.log(outBlk);
        }
        console.log('updateAttendance', outBlk);
    },
    err => {
      console.log(err);
    }
    );
  }

  ionChange(event) {
    const m = event.detail.value.slice(0, 4) + event.detail.value.slice(5, 7);
    console.log(m);
    this.ACSvc.getAttendance(m).subscribe(
      (outBlk: EI.JsonEIInfo) => {
        if (outBlk.SysInfo.Flag === 0) {
          console.log('get attendance successfully');
          console.log(outBlk);
          this.checkList = outBlk.getTable('Table0').Data;
        }
        console.log('getAttendance', outBlk);
    },
    err => {
      console.log(err);
    }
    );
  }

}
