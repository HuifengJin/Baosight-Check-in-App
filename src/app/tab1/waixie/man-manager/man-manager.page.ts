import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras} from '@angular/router';
import { DatePipe } from '@angular/common';
import { EI } from '../../../shared/iplat4c/ei';
import { ManManagerService } from './man-manager.service';
import { AlertController } from '@ionic/angular';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-man-manager',
  templateUrl: './man-manager.page.html',
  styleUrls: ['./man-manager.page.scss'],
})
export class ManManagerPage implements OnInit {

  public InfoArray;
  public useEndDate;
  public useStartDate;
  public UseTypeArray: any[] = [];

  public time = new Date();

  public condition = {
    ENAME: '',
    CNAME: '',
    PROJECT_NO: '',
    PROJECT_NAME: '',
    USE_ENAME: '',
    EXPECTED_USE_END_DATE: '',
    STATUS: '',
    PM: '',
    PD: '',
    RELEASE_USE_DATE: this.datePipe.transform(this.time, 'yyyyMMdd'),
    USE_TYPE: '',
    PARTICIPATION_MODULE: '',
    GOOD_AT_SKILLS: '',
    USE_START_DATE: '',
    LATEST_EVALUATION: '',
    REC_REVISOR: this.$localStorage.retrieve('userInfo')[0].CNAME,
    REC_REVISE_TIME: this.datePipe.transform(this.time, 'yyyyMMddHHmmss')
  };
  constructor(private datePipe: DatePipe, private MMSvs: ManManagerService, public router: Router
    , public activeRoute: ActivatedRoute, public alertController: AlertController
    , private $localStorage: LocalStorageService, private $sessionStorage: SessionStorageService) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(res => {
      console.log('route param:', res);
      this.InfoArray = res;
      console.log('infoarray', this.InfoArray);
      this.condition.ENAME = this.InfoArray.ENAME;
      this.condition.CNAME = this.InfoArray.CNAME;
      this.condition.PROJECT_NO = this.InfoArray.PROJECT_NO;
      this.condition.PROJECT_NAME = this.InfoArray.PROJECT_NAME;
      this.condition.USE_ENAME = this.InfoArray.USE_ENAME;
      this.condition.USE_TYPE = this.InfoArray.USE_TYPE;
      this.condition.PARTICIPATION_MODULE = this.InfoArray.PARTICIPATION_MODULE;
      this.condition.GOOD_AT_SKILLS = this.InfoArray.GOOD_AT_SKILLS;
      if (this.InfoArray.USE_START_DATE !== ' ') {
      this.condition.USE_START_DATE = this.InfoArray.USE_START_DATE.slice(0, 4) + '-' +
      this.InfoArray.USE_START_DATE.slice(4, 6) + '-' + this.InfoArray.USE_START_DATE.slice(6, 8); }
      this.condition.LATEST_EVALUATION = this.InfoArray.LATEST_EVALUATION;
      if (this.InfoArray.EXPECTED_USE_END_DATE !== ' ') {
      this.condition.EXPECTED_USE_END_DATE = this.InfoArray.EXPECTED_USE_END_DATE.slice(0, 4) + '-' +
      this.InfoArray.EXPECTED_USE_END_DATE.slice(4, 6) + '-' + this.InfoArray.EXPECTED_USE_END_DATE.slice(6, 8); }
      console.log(this.condition);
    });

    // get use type table
    this.MMSvs.getUseType().subscribe(
      (outBlk: EI.JsonEIInfo) => {
        if (outBlk.SysInfo.Flag === 0) {
          console.log('GET USE TYPE!', outBlk);
          outBlk.getTable('Table0').Data.forEach(element => {
            this.UseTypeArray.push({CODE: element['CODE_DESC_2_CONTENT'], NAME: element['CODE_DESC_1_CONTENT']});
          });
          console.log('USE TYPE ARE:', this.UseTypeArray);
        } else {
          this.presentAlert('FAIL TO GET USE TYPE' + outBlk.SysInfo.Msg);
        }
        console.log(outBlk);
    },
    err => {
      console.log(err);
    }
    );
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: '提示',
      message: msg,
      buttons: ['确定']
    });

    await alert.present();
  }

  Practice() {
    this.condition.STATUS = '1';
    this.useEndDate = this.datePipe.transform(this.condition.EXPECTED_USE_END_DATE, 'yyyyMMdd');
    this.useStartDate = this.datePipe.transform(this.condition.USE_START_DATE, 'yyyyMMdd');
    this.MMSvs.practice(this.condition, this.useEndDate, this.useStartDate).subscribe(
      (outBlk: EI.JsonEIInfo) => {
        if (outBlk.SysInfo.Flag === 0) {
          console.log('practice succeeded');
          this.presentAlert('使用成功！');
          this.router.navigate(['/manager']);
        } else {
          this.presentAlert('使用失败：' + outBlk.SysInfo.Msg);
        }
        console.log(outBlk);
    },
    err => {
      this.presentAlert('使用失败！');
      console.log(err);
    }
    );
  }

  Release() {
    this.condition.STATUS = '2';
    this.condition.USE_ENAME = '';
    this.condition.PM = '';
    this.condition.PD = '';
    this.MMSvs.release(this.condition).subscribe(
      (outBlk: EI.JsonEIInfo) => {
        if (outBlk.SysInfo.Flag === 0) {
          this.presentAlert('释放成功');
          console.log('release succeeded');
          this.router.navigate(['/manager']);
        } else {
          this.presentAlert('释放失败：' + outBlk.SysInfo.Msg);
        }
        console.log(outBlk);
    },
    err => {
      this.presentAlert('释放失败！');
      console.log(err);
    }
    );
  }

}
