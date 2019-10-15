import {  Router, ActivatedRoute, NavigationExtras} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EI } from '../../../shared/iplat4c/ei';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { AssessContentService } from './assess-content.service';
import { DatePipe } from '@angular/common';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-assess-content',
  templateUrl: './assess-content.page.html',
  styleUrls: ['./assess-content.page.scss'],
})
export class AssessContentPage implements OnInit {
  public InfoArray: any;
  public AssessInfo: any;
  public time = new Date();

  public condition = {
    ENAME: '',
    CNAME: '',
    PROJECT_NO: '',
    PROJECT_NAME: '',
    USE_CNAME: '',
    SCORE: '',
    GRADE: '',
    ABSENT_DAYS: '',
    ABSENT_REASON: '',
    MONTH: '',
    ARCHIVE_FLAG: '',
    NOTE: '',
    USE_TYPE: '',
    GOOD_AT_SKILLS: '',
    PARTICIPATION_MODULE: '',
    USE_START_DATE: '',
    EXPECTED_USE_END_DATE: '',
    IS_ASSESS: '',
    PM: '',
    PD: '',
    WORK_SKILL: '',
    WORK_ATTITUDE: '',
    WORK_LOAD: '',
    WORK_QUALITY: '',
    REC_CREATOR: this.$localStorage.retrieve('userInfo')[0].CNAME,
    REC_REVISOR: this.$localStorage.retrieve('userInfo')[0].CNAME,
    REC_CREATE_TIME: this.datePipe.transform(this.time, 'yyyyMMddHHmmss'),
    REC_REVISE_TIME: this.datePipe.transform(this.time, 'yyyyMMddHHmmss')
  };

  constructor(public activeRoute: ActivatedRoute, public router: Router, private ACSvs: AssessContentService
    , private $localStorage: LocalStorageService, private $sessionStorage: SessionStorageService
    , private datePipe: DatePipe, public alertController: AlertController) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(res => {
      console.log('route param:', res);
      this.InfoArray = res;
      console.log('infoarray', this.InfoArray);
      this.condition.ENAME = this.InfoArray.ENAME;
      this.condition.CNAME = this.InfoArray.CNAME;
      this.condition.PROJECT_NO = this.InfoArray.PROJECT_NO;
      this.condition.PROJECT_NAME = this.InfoArray.PROJECT_NAME;
      this.condition.MONTH = this.InfoArray.MONTH;
      this.condition.PM = this.InfoArray.PM;
      this.condition.PD = this.InfoArray.PD;
      this.condition.PARTICIPATION_MODULE = this.InfoArray.PARTICIPATION_MODULE;
      this.condition.USE_CNAME = this.InfoArray.USE_CNAME;
      this.condition.USE_START_DATE = this.InfoArray.USE_START_DATE;
      this.condition.EXPECTED_USE_END_DATE = this.InfoArray.EXPECTED_USE_END_DATE;
      console.log(this.condition);

      this.ACSvs.getAssessInfo(this.condition.ENAME, this.condition.MONTH).subscribe(
        (outBlk: EI.JsonEIInfo) => {
          if (outBlk.SysInfo.Flag === 0) {
            console.log('get assessinfo successfully');
            console.log(outBlk);
            this.AssessInfo = outBlk.getTable('Table0').Data;
            if (this.AssessInfo[0] !== undefined) {
            console.log(this.AssessInfo[0].IS_ASSESS);
            this.condition.SCORE = this.AssessInfo[0].SCORE;
            this.condition.ABSENT_DAYS = this.AssessInfo[0].ABSENT_DAYS;
            this.condition.ABSENT_REASON = this.AssessInfo[0].ABSENT_REASON;
            this.condition.IS_ASSESS = this.AssessInfo[0].IS_ASSESS;
            this.condition.WORK_SKILL = this.AssessInfo[0].WORK_SKILL;
            this.condition.WORK_ATTITUDE = this.AssessInfo[0].WORK_ATTITUDE;
            this.condition.WORK_LOAD = this.AssessInfo[0].WORK_LOAD;
            this.condition.WORK_QUALITY = this.AssessInfo[0].WORK_QUALITY;
            this.condition.NOTE = this.AssessInfo[0].NOTE;
            this.setGrade(this.condition.SCORE); }
          }
          console.log('getAssessInfo', outBlk);
      },
      err => {
        console.log(err);
      }
      );
    });
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: '提示',
      message: msg,
      buttons: ['确定']
    });

    await alert.present();
  }

  setGrade(n) {
    if (n >= 90 && n <= 100) {
      this.condition.GRADE = 'A';
    } else if (n >= 80 && n <= 89) {
      this.condition.GRADE = 'B';
    } else if (n >= 70 && n <= 79) {
      this.condition.GRADE = 'C';
    } else if (n >= 60 && n <= 69) {
      this.condition.GRADE = 'D';
    } else if (n < 60) {
      this.condition.GRADE = 'E';
    }

  }

  assessConfirm() {
    this.setGrade(this.condition.SCORE);
    console.log(this.condition.IS_ASSESS);
     if (this.condition.IS_ASSESS === '1') {
      console.log('update');
      this.ACSvs.updateAssess(this.condition).subscribe(
        (outBlk: EI.JsonEIInfo) => {
          if (outBlk.SysInfo.Flag === 0) {
            console.log('assess confirm successfully');
            this.presentAlert('评价成功！');
            this.router.navigate(['/assess']);
          } else {
            this.presentAlert('评价失败：' + outBlk.SysInfo.Msg);
          }
          console.log('assess confirmed', outBlk);
      },
      err => {
        console.log(err);
      }
      );
    } else {
      console.log(this.condition.IS_ASSESS);
      console.log('insert');
      this.condition.IS_ASSESS = '1';
      this.ACSvs.insertAssess(this.condition).subscribe(
        (outBlk: EI.JsonEIInfo) => {
          if (outBlk.SysInfo.Flag === 0) {
            console.log('assess confirm successfully');
            this.presentAlert('评价成功！');
            this.router.navigate(['/assess']);
          } else {
            this.presentAlert('评价失败：' + outBlk.SysInfo.Msg);
          }
          console.log('assess confirmed', outBlk);
      },
      err => {
        console.log(err);
      }
      );
    }
  }
}
