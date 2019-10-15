import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { WaixieLoginService } from './waixie-login.service';
import { Router } from '@angular/router';
import { EI } from '../../shared/iplat4c/ei';
import { DatePipe } from '@angular/common';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-waixie-login',
  templateUrl: './waixie-login.component.html',
  styleUrls: ['./waixie-login.component.scss'],
})
export class WaixieLoginComponent implements OnInit {

  public time = new Date();
  public DegreeArray: any[] = [];
  public CompanyArray: any[] = [];
  public DeptArray: any[] = [];
  public gradT: any;
  public startT: any;
  public eduT: any;

  public condition: any = {
    ENAME: '',
    CNAME: '',
    GENDER: '',
    TEL_PHONE: '',
    EMAIL: '',
    ID_CARD: '',
    DEGREE: '',
    YEAR_OF_GRADUATION: '',
    UNIVERSITY: '',
    MAJOR: '',
    PROFESSION_SKILLS: '',
    NATIONALITY: '',
    JOB_TITLE: '',
    COMPREHENSIVE_INSURANCE: '',
    INAUGURATION_DATE: '',
    OUTSOURCING_COMPANY: '',
    USE_DEPT_ENAME: '',
    SAFETY_EDU_DATE: '',
    REC_CREATOR: this.$localStorage.retrieve('userInfo')[0].CNAME,
    REC_REVISOR: this.$localStorage.retrieve('userInfo')[0].CNAME,
    REC_CREATE_TIME: this.datePipe.transform(this.time, 'yyyyMMddHHmmss'),
    REC_REVISE_TIME: this.datePipe.transform(this.time, 'yyyyMMddHHmmss')
  };
  constructor(public navParams: NavParams, private WXSvs: WaixieLoginService, private datePipe: DatePipe
    , private $localStorage: LocalStorageService, private $sessionStorage: SessionStorageService
    , public alertController: AlertController) {
    console.log(this.navParams);
   }

  ngOnInit() {
    console.log('from localstorage cname:', this.$localStorage.retrieve('userInfo')[0].CNAME);

    // get degree table
    this.WXSvs.getDegree().subscribe(
      (outBlk: EI.JsonEIInfo) => {
        if (outBlk.SysInfo.Flag === 0) {
          console.log('GET DEGREE!', outBlk);
          outBlk.getTable('Table0').Data.forEach(element => {
            for (const key of Object.keys(element)) {
              if (key === 'CODE_DESC_1_CONTENT') {
                this.DegreeArray.push(element[key]);
              }
            }
          });
          console.log('DEGREE ARE:', this.DegreeArray);
        } else {
          this.presentAlert('FAIL TO GET DEGREE：' + outBlk.SysInfo.Msg);
        }
        console.log(outBlk);
    },
    err => {
      console.log(err);
    }
    );

    // get company table
    this.WXSvs.getCompany().subscribe(
      (outBlk: EI.JsonEIInfo) => {
        if (outBlk.SysInfo.Flag === 0) {
          console.log('GET COMPANY!', outBlk);
          outBlk.getTable('Table0').Data.forEach(element => {
            this.CompanyArray.push({CODE: element['OUTSOURCING_COMPANY_CODE'], NAME: element['OUTSOURCING_COMPANY_NAME']});
          });
          console.log('COMPANY ARE:', this.CompanyArray);
        } else {
          this.presentAlert('FAIL TO GET COMPANY' + outBlk.SysInfo.Msg);
        }
        console.log(outBlk);
    },
    err => {
      console.log(err);
    }
    );

    // get dept table
    this.WXSvs.getDept().subscribe(
      (outBlk: EI.JsonEIInfo) => {
        if (outBlk.SysInfo.Flag === 0) {
          console.log('GET DEPT!', outBlk);
          outBlk.getTable('Table0').Data.forEach(element => {
            this.DeptArray.push({CODE: element['DEPT_ENAME'], NAME: element['DEPT_CNAME']});
          });
          console.log('DEPT ARE:', this.DeptArray);
        } else {
          this.presentAlert('FAIL TO GET DEPT' + outBlk.SysInfo.Msg);
        }
        console.log(outBlk);
    },
    err => {
      console.log(err);
    }
    );
  }
  closeModel() {
    this.navParams.data.modal.dismiss({
      'result': '消失的时候返回的内容'
    });
  }
  confirm() {
    if (this.condition.ENAME !== '' && this.condition.CNAME !== '') {
    this.gradT = this.datePipe.transform(this.condition.YEAR_OF_GRADUATION, 'yyyyMM');
    this.startT = this.datePipe.transform(this.condition.INAUGURATION_DATE, 'yyyyMMdd');
    this.eduT = this.datePipe.transform(this.condition.SAFETY_EDU_DATE, 'yyyyMMdd');
    this.WXSvs.WXlogin(this.condition, this.gradT, this.startT, this.eduT).subscribe(
      (outBlk: EI.JsonEIInfo) => {
        if (outBlk.SysInfo.Flag === 0) {
          // this.presentAlert('新增外协登记成功！');
          console.log('waixie login succeeded');
        } else {
          this.presentAlert('新增外协登记失败：' + outBlk.SysInfo.Msg);
        }
        console.log(outBlk);
    },
    err => {
      console.log(err);
    }
    );
  } else {
    this.presentAlert('请输入工号和姓名');
  }
    this.closeModel();
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: '提示',
      message: msg,
      buttons: ['确定']
    });

    await alert.present();
  }
}
