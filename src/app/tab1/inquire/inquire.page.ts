import { Component, OnInit } from '@angular/core';
import {Router, NavigationExtras, ActivatedRoute} from '@angular/router';
import { InquireService } from './inquire.service';
import { EI } from '../../shared/iplat4c/ei';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-inquire',
  templateUrl: './inquire.page.html',
  styleUrls: ['./inquire.page.scss'],
})
export class InquirePage implements OnInit {

  public month: any;

  public condition: any = {
    ENAME: '',
    CNAME: '',
    MONTH: '',
    HOLIDAY: 0,
    BUSINESS: 0,
    DEPT_ENAME: '',
    GROUP_ENAME: ''
  };

  public department: any[] = [];

  public executive: any[] = [];
  public inqList;

  constructor(public inqSvs: InquireService, public router: Router, public activeRoute: ActivatedRoute
    , private datePipe: DatePipe) {
   }

  ngOnInit() {
    // get dept table
    this.inqSvs.getDept().subscribe(
      (outBlk: EI.JsonEIInfo) => {
        if (outBlk.SysInfo.Flag === 0) {
          console.log('GET DEPT!', outBlk);
          outBlk.getTable('Table0').Data.forEach(element => {
            this.department.push({value: element['CODE'], desc: element['CODE_DESC_1_CONTENT']});
          });
          console.log('DEPT ARE:', this.department);
        }
        console.log(outBlk);
    },
    err => {
      console.log(err);
    }
    );

  }

  find() {
    console.log(this.condition);
    this.month = this.datePipe.transform(this.condition.MONTH, 'yyyyMM');
    this.inqSvs.findAtt(this.condition, this.month).subscribe(
      (outBlk: EI.JsonEIInfo) => {
        if (outBlk.SysInfo.Flag === 0) {
          console.log('get attendance successfully');
          this.inqList = outBlk.getTable('Table0').Data;
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
          businessDay: item.BUSINESS_LIST,
          holidayDay: item.HOLIDAY_LIST
      }
  };
    this.router.navigate(['/inquire/inquire-detail'], routerParams);
  }

  ionChange(event) {
    console.log(event.detail.value);
    this.executive = [];
    this.inqSvs.getGroup(event.detail.value).subscribe(
      (outBlk: EI.JsonEIInfo) => {
        if (outBlk.SysInfo.Flag === 0) {
          console.log('GET GROUP!', outBlk);
          outBlk.getTable('Table0').Data.forEach(element => {
            this.executive.push({value: element['GROUP_ENAME'], desc: element['GROUP_CNAME']});
          });
          console.log('GROUP ARE:', this.executive);
        }
        console.log(outBlk);
    },
    err => {
      console.log(err);
    }
    );
  }

}
