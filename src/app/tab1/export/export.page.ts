import { Component, OnInit } from '@angular/core';
import {Router, NavigationExtras, ActivatedRoute} from '@angular/router';
import { ExportService } from './export.service';
import { EI } from '../../shared/iplat4c/ei';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-export',
  templateUrl: './export.page.html',
  styleUrls: ['./export.page.scss'],
})
export class ExportPage implements OnInit {

  public month: any;
  public All = false;

  public condition: any = {
    ENAME: '',
    CNAME: '',
    MONTH: '',
    HOLIDAY: 0,
    BUSINESS: 0,
    DEPT_ENAME: '',
    GROUP_ENAME: '',
    STATUS: '1',
  };

  public department: any[] = [];

  public executive: any[] = [];

  public confirmFlag = false;

  public expList;

  constructor(public expSvs: ExportService, public router: Router, public activeRoute: ActivatedRoute
    , private datePipe: DatePipe) {
  }

  ngOnInit() {
    // get dept table
    this.expSvs.getDept().subscribe(
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

  inquire() {
    if (this.confirmFlag) {
      this.condition.STATUS = '0';
    }
    console.log(this.condition);
    this.month = this.datePipe.transform(this.condition.MONTH, 'yyyyMM');
    this.expSvs.findAtt(this.condition, this.month).subscribe(
      (outBlk: EI.JsonEIInfo) => {
        if (outBlk.SysInfo.Flag === 0) {
          console.log('get attendance successfully');
          this.expList = outBlk.getTable('Table0').Data;
          if (this.expList !== undefined) {
            console.log('enter expList');
            this.expList.forEach(user => {
              user.EXPORT = false;
              console.log('user:', user);
            });
          }
        }
        console.log('getAttendance', outBlk);
    },
    err => {
      console.log(err);
    }
    );
  }

  ionChange(event) {
    console.log(event.detail.value);
    this.executive = [];
    this.expSvs.getGroup(event.detail.value).subscribe(
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

  export() {
    console.log(this.expList);
  }

}
