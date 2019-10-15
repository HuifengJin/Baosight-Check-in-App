import { Tab1Service } from './../../tab1.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AssessService } from './assess.service';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { EI } from '../../../shared/iplat4c/ei';

@Component({
  selector: 'app-assess',
  templateUrl: './assess.page.html',
  styleUrls: ['./assess.page.scss'],
})
export class AssessPage implements OnInit {


  public month: any;
  public all_userInfo: any;
  public assessFlag: any;
  public date = this.datePipe.transform(new Date(), 'yyyy-MM');
  public queryFlag = false;

  public condition: any = {
    CNAME: '',
    USE_ENAME: '',
    PROJECT_NAME: '',
    MONTH: ''
  };

  public assList;
  public detailUrl: string;
  constructor(public assSvc: AssessService, public homeSvc: Tab1Service, public router: Router
    , public activeRoute: ActivatedRoute, private datePipe: DatePipe) {
      this.condition.MONTH = new Date();
      console.log(this.condition.MONTH);
     }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (this.queryFlag) {
      this.assSvc.getUserInfo(this.condition, this.month).subscribe(
        (outBlk: EI.JsonEIInfo) => {
          if (outBlk.SysInfo.Flag === 0) {
            console.log('get userinfo successfully');
          }
          console.log('getUserInfo', outBlk);
          this.assList = outBlk.getTable('Table0').Data;
      },
      err => {
        console.log(err);
      }
      );
      }
  }

  query() {
    this.queryFlag = true;
    this.month = this.datePipe.transform(this.condition.MONTH, 'yyyyMM');
    console.log(this.month);
      if (this.queryFlag) {
    this.assSvc.getUserInfo(this.condition, this.month).subscribe(
      (outBlk: EI.JsonEIInfo) => {
        if (outBlk.SysInfo.Flag === 0) {
          console.log('get userinfo successfully');
        }
        console.log('getUserInfo', outBlk);
        this.assList = outBlk.getTable('Table0').Data;
    },
    err => {
      console.log(err);
    }
    );
    }
  }

  goDetail(item) {
    // let params={
    //   item:item,
    //   from:this.detailUrl
    // }
    // item.from=this.detailUrl
    // 梁颖看到是外协信息维护
    // 经理看到是外协管理
    this.month = this.datePipe.transform(this.condition.MONTH, 'yyyyMM');
    console.log('ENAME:', item.ENAME);
    console.log('MONTH:', this.month);

    const routerParams: NavigationExtras  = {
      queryParams: {
          ENAME: item.ENAME,
          CNAME: item.CNAME,
          PROJECT_NO: item.PROJECT_NO,
          PROJECT_NAME: item.PROJECT_NAME,
          MONTH: this.month,
          PM: item.PM,
          PD: item.PD,
          PARTICIPATION_MODULE: item.PARTICIPATION_MODULE,
          USE_CNAME: item.USE_ENAME,
          USE_START_DATE: item.USE_START_DATE,
          EXPECTED_USE_END_DATE: item.EXPECTED_USE_END_DATE
      }
  };

    this.router.navigate(['/assess/assessContent'], routerParams);
    }

}
